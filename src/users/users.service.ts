import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
    private supabase;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_KEY
        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    async getUsers() {
        // const { data: users, error } = await this.supabase.from('users').select('*');

        console.log(this.supabase);

        // if (error) {
        //     console.log(this.supabase);
        //     // console.error(error);
        // } else {
        //     return users;
        // }
    }
}