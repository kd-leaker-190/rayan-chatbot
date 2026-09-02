<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Website\StoreWebsiteRequest;
use App\Http\Resources\WebsiteResource;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Throwable;

class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @throws Throwable
     */
    public function store(StoreWebsiteRequest $request)
    {
        $user = $request->user();

        $website = DB::transaction(function () use ($user, $request) {
            $website = new Website([
                'title' => $request->validated('title'),
                'domain' => $request->validated('domain'),
            ]);

            $website->owner()->associate($user);
            $website->save();

            return $website;
        });

        return ApiResponse::success(
            data: new WebsiteResource($website),
            message: 'وبسایت شما با موفقیت ایجاد شد.',
            code: 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Website $website)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Website $website)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Website $website)
    {
        //
    }
}
