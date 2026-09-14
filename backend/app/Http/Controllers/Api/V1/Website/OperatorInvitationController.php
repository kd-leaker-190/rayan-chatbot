<?php

namespace App\Http\Controllers\Api\V1\Website;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Mail\OperatorInvitationEmail;
use App\Models\OperatorInvitation;
use App\Models\Role;
use App\Models\Website;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class OperatorInvitationController extends Controller
{
    public function send(Request $request, Website $website)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'role_id' => [
                'required',
                Rule::exists('roles', 'id')->where(function (Builder $query) use ($website) {
                    $query->where('website_id', $website->id)
                        ->orWhereNull('website_id');
                }),
            ],
        ]);

        $user = $request->user();
        $role = Role::findOrFail($validated['role_id']);
        $token = Str::random(64);

        $invitation = new OperatorInvitation([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'token_hash' => Hash::make($token),
            'expires_at' => now()->addDays(5),
        ]);

        $invitation->website()->associate($website);
        $invitation->role()->associate($role);
        $invitation->invitedBy()->associate($user);
        $invitation->save();

        Mail::to($invitation->email)->queue(new OperatorInvitationEmail($invitation));

        return ApiResponse::success(
            message: 'یک ایمیل دعوت به مخاطب موردنظر ارسال شد، در صورت تایید به وبسایت شما اضافه خواهد شد.',
            code: 201,
        );
    }
}
