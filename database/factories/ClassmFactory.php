<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ClassmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement(['s1', 's2', 's3', 's4', 's5', 's6']),
            'amount' => $this->faker->numberBetween(100, 300),
            'status' => $this->faker->randomElement(['online', 'onsite'])
        ];
    }
}
