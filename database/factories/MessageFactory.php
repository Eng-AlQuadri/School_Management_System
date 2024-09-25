<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sender_id' => $this->faker->numberBetween(1, 34),
            'reciever_id' => $this->faker->numberBetween(1, 34),
            'content' => $this->faker->randomElement(['Hello', 'Good Morning', 'Where is the exam?', 'when you will show the grades?', 'regards', 'good evening', 'math', 'chemistery', 'your homework', 'its easy!']),
            'status' => $this->faker->randomElement(['seen', 'recieved'])
        ];
    }
}
