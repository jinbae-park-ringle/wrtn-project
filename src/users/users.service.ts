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
            return error;
        } else {
            return users;
        }
    }

    async getUser(id: number) {
        const { data: user, error } = await this.supabase.from('users').select('*').eq('id', id).single()

        if (error) {
            return error;
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
        const { data: user, error } = await this.supabase.from('users').insert({ email, name, password: hashedPassword })

        if (error) {
            return error;
        } else {
            return "성공적으로 생성되었습니다."
        }
    }

    async updateUser(id: number, email: string, name: string, password: string) {
        const hashedPassword = await this.hashPassword(password);
        const { data: user, error } = await this.supabase.from('users').update({ email, name, password: hashedPassword }).eq('id', id)

        if (error) {
            return error;
        } else {
            return "성공적으로 수정되었습니다."
        }
    }

    async deleteUser(id: number) {
        const { data: user, error } = await this.supabase.from('users').delete().eq('id', id)

        if (error) {
            return error;
        } else {
            return "성공적으로 삭제되었습니다."
        }
    }
}
