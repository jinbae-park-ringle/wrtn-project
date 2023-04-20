import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';
import { DuplicateEmailError, NoResultError, InvalidEmailError, UpdateUserRequest } from './users.module';

function getSupabaseClient() {
    const supabaseUrl = "https://xxibjawyzuvhzzmblcim.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4aWJqYXd5enV2aHp6bWJsY2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4MTU5MzcsImV4cCI6MTk5NzM5MTkzN30.0XElYC64U_k0VCK4mIVIDSACw54cY35yxeZ9JVqfcvM";
    return createClient(supabaseUrl, supabaseKey);
}

@Injectable()
export class UsersService {
    private supabase;

    constructor() {
        this.supabase = getSupabaseClient();
    }

    async getUsers() {
        const { data: users, error } = await this.supabase.from('users').select('*');

        if (error) {
            if (error.code === "PGRST116") {
                throw new NoResultError();
            } else {
                return error;
            }
        } else {
            return users;
        }
    }

    async getUser(id: number) {
        const { data: user, error } = await this.supabase.from('users').select('*').eq('id', id).single();

        if (error) {
            if (error.code === "PGRST116") {
                throw new NoResultError();
            } else {
                return error;
            }
        } else {
            return user;
        }
    }

    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async createUser(email: string, name: string, password: string) {
        const hashedPassword = await this.hashPassword(password);
        const { data: user, error } = await this.supabase.from('users').insert([{ email, name, password: hashedPassword }]).select().single();

        if (error) {
            if (error.code === '23505') {
                throw new DuplicateEmailError();
            } else if (error.code === '23514') {
                throw new InvalidEmailError();
            }
            else {
                return error;
            }
        } else {
            return user;
        }
    }

    async updateUser(id: number, fieldsToUpdate: Partial<UpdateUserRequest>) {
        const { email, name, password } = fieldsToUpdate
        const hashedPassword = password ? await this.hashPassword(password) : undefined;
        const { data: user, error } = await this.supabase.from('users').update({ email, name, password: hashedPassword }).eq('id', id).select().single();
        
        if (error) {
            if (error.code === '23505') {
                throw new DuplicateEmailError();
            } else if (error.code === 'PGRST116') {
                throw new NoResultError();
            } else if (error.code === '23514') {
                throw new InvalidEmailError();
            }
            else {
                return error;
            }
        } else {
            return user;
        }
    }

    async deleteUser(id: number) {
        const { data: user, error } = await this.supabase.from('users').delete().eq('id', id).select().single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NoResultError();
            } else {
                return error;
            }
        } else {
            return user;
        }
    }
}
