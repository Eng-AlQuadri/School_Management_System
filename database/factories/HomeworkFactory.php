<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Homework>
 */
class HomeworkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'class_id' => $this->faker->numberBetween(1, 6),
            'subject_id' => $this->faker->numberBetween(1, 4),
            'assigned_by' => $this->faker->randomElement([1, 2]),
            'date' => $this->faker->dateTimeBetween('-3 years', '-2 years')
        ];
    }
}
