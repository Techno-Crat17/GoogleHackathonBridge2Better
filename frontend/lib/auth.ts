import { apiFetch } from "./api";
import { API_BASE_URL } from "./config";

export type Token = { access_token: string; token_type: string };

export type RegisterPayload = {
    email: string;
    password: string;
    full_name?: string;
    role?: "student" | "mentor";
};

export async function registerUser(payload: RegisterPayload) {
    return apiFetch<{ id: number; email: string; full_name?: string; role?: string; is_active?: boolean }>(
        "/api/v1/auth/register",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    );
}

export async function login(email: string, password: string): Promise<Token> {
    const body = new URLSearchParams();
    body.set("username", email);
    body.set("password", password);

    const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!res.ok) {
        let errorMsg = "Login failed";
        try {
            const errorData = await res.json();
            if (errorData.detail) {
                errorMsg = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
            }
        } catch {
            errorMsg = await res.text() || "Login failed";
        }
        throw new Error(errorMsg);
    }
    
    return (await res.json()) as Token;
}

export async function getMe(accessToken: string) {
    return apiFetch<{ id: number; email: string; full_name?: string; role?: string }>(
        "/api/v1/users/me",
        { accessToken }
    );
}

const TOKEN_KEY = "sb_access_token";

export function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}
export function loadToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}