<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                 'name' => 'required|string|max:100', 'email' => 'required|string|max:100|email','password' => ['required', Password::min(8)->mixedCase()] //|unique:users,email
            ]
        );
        if ($validator->fails()) return response()->json(['validation_errors'=>$validator->messages(),]);  //$validator->errors()

        $user = User::create(['name' => $request->name, 'email' => $request->email, 'password' => Hash::make($request->password)]);

        $token = $user->createToken($user->email.'_Token')->plainTextToken; //'auth_token'
        return response()->json(['status'=>200, 'name'=>$user->name, 'token'=>$token,'message'=>'Registred Success']); //'data' => $user, 'acess_token' => $token, 'token_type' => 'Bearer'
    }

    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|max:100|email','password' => 'required' //|unique:users,email
            ]
        );
        if ($validator->fails()) return response()->json(['validation_errors'=>$validator->messages(),]);
        else {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
              'status'=>401,
              'message'=>'Invalid Credentials',
                ]);
            }
            else {
                if($user->role==1) {
                    $token = $user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;  
                }
                else {
                    $token = $user->createToken($user->email.'_Token',[''])->plainTextToken; 
                }
                
                return response()->json(['status'=>200, 'name'=>$user->name, 'token'=>$token,'message'=>'Logged in Success']);
            }
        }

        /*if (!Auth::attempt($request->only('email', 'password'))) return response()->json(['success'=>false]);
        $user = User::where('name', $request['name'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['success'=>true, 'acess_token' => $token, 'token_type' => 'Bearer']);*/
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return ['status'=>200,'message' => 'You have logout'];
    }
}
