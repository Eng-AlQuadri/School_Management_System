<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => $this->faker->numberBetween(2, 17),
            'class_id' => $this->faker->numberBetween(1, 6),
            'date' => $this->faker->dateTimeBetween('-3 years', '-2 years'),
            'status' => $this->faker->randomElement(['late', 'absent'])
        ];
    }
}
