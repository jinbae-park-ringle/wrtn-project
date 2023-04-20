import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';
import { DuplicateEmailError, NoResultError, UpdateUserRequest } from './users.module';

function getSupabaseClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
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
        const { data: user, error } = await this.supabase.from('users').insert([{ email, name, password: hashedPassword }]);

        if (error) {
            if (error.code === '23505') {
                throw new DuplicateEmailError();
            } else {
                return error;
            }
        } else {
            return user;
        }
    }

    async updateUser(id: number, fieldsToUpdate: Partial<UpdateUserRequest>) {
        const { email, name, password } = fieldsToUpdate
        const hashedPassword = password ? await this.hashPassword(password) : undefined;
        const { data: user, error } = await this.supabase.from('users').update({ email, name, password: hashedPassword }).eq('id', id);
        
        if (error) {
            if (error.code === '23505') {
                throw new DuplicateEmailError();
            } else {
                return error;
            }
        } else {
            return user;
        }
    }

    async deleteUser(id: number) {
        const { data: user, error } = await this.supabase.from('users').delete().eq('id', id);

        if (error) {
            return error;
        } else {
            return user;
        }
    }
}
