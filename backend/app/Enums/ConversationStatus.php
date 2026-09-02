<?php

namespace App\Enums;

enum ConversationStatus: string
{
    case STARTED = 'started';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
}
