<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeacherClasses>
 */
class TeacherClassesFactory extends Factory
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
            'teacher_id' => $this->faker->numberBetween(1, 8),
            'created_by' => $this->faker->randomElement([1, 2])
        ];
    }
}
