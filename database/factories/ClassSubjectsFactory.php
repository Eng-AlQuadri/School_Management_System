<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClassSubjects>
 */
class ClassSubjectsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'class_id' => $this->faker->unique()->numberBetween(1, 6),
            'subject_id' => $this->faker->numberBetween(1, 4),
            'created_by' => $this->faker->randomElement([1, 2]),
            'status' => $this->faker->randomElement(['online', 'onsite'])
        ];
    }
}
