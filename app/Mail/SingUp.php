<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SingUp extends Mailable
{
    use Queueable, SerializesModels;

    public $trigger;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($trigger)
    {
        $this->trigger = $trigger;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail', ['trigger'=>$this->trigger]);
    }
}
