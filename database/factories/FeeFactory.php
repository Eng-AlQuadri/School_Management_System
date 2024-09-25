<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fee>
 */
class FeeFactory extends Factory
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
            'collected_by' => $this->faker->randomElement([1, 2]),
            'amount' => $this->faker->numberBetween(100, 500),
            'status' => $this->faker->randomElement(['pending', 'paid'])
        ];
    }
}
