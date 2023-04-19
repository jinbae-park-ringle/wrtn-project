import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private supabase;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_KEY
        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    async getUsers() {
        const { data: users, error } = await this.supabase.from('users').select('*')

        if (error) {
            console.error(error);
        } else {
            return users;
        }
    }

    async getUser(id: number) {
        const { data: user, error } = await this.supabase.from('users').select('*').eq('id', id).single();

        if (error) {
            console.error(error);
        } else {
            return user;
        }
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        return hashedPassword;
    }

    async createUser(email: string, name: string, password: string) {
        const hashedPassword = await this.hashPassword(password);
        const { data: user, error } = await this.supabase.from('users').insert({
            email: email,
            name: name,
            password: hashedPassword
        })

        if (error) {
            return error;
        } else {
            return user;
        }
    }
}
