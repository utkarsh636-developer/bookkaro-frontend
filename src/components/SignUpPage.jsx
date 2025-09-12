import React from 'react'

function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <h2 class="text-2xl font-bold text-center text-[#98430e] mb-6">Sign Up</h2>
            <form class="space-y-4" action="/users/signup" method="post">
            <div>
                <label class="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#98430e]" name="fullname" placeholder="Your name" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#98430e]" name="email" placeholder="you@example.com" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#98430e]" name="password" placeholder="••••••••" />
            </div>
            <button type="submit" class="w-full bg-[#98430e] text-white py-2 rounded-md hover:bg-orange-800 transition">Signup</button>
            </form>
            <p class="text-sm text-center text-gray-600 mt-4">
            Already have an account?
            <a href="/login" class="text-[#98430e] font-medium hover:underline">Log in</a>
            </p>
        </div>
    </div>
  )
}

export default SignUpPage

