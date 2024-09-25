<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SubjectsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement(['chemistry', 'biology', 'math', 'English']),
            'type' => $this->faker->randomElement(['practical', 'theoretical']),
            'status' => $this->faker->randomElement(['online', 'onsite']),
            'created_by' => $this->faker->randomElement([1, 2])
        ];
    }
}
