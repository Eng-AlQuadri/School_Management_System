<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MarkFactory extends Factory
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
            'exam_id' => $this->faker->numberBetween(1, 15),
            'subject_id' => $this->faker->numberBetween(1, 4),
            'grade' => $this->faker->numberBetween(30, 100)
        ];
    }
}
