<?php

namespace App\Enums;

enum MessageStatus: string
{
    case OPERATOR_ANSWER = 'operator_answer';
    case VISITOR_ANSWER = 'visitor_answer';
    case SEEN_BY_OPERATOR = 'seen_by_operator';
    case SEEN_BY_VISITOR = 'seen_by_visitor';
}
