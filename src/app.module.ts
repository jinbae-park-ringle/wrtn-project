import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from '@supabase/supabase-js';
import { UsersModule } from './users/users.module';

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, { provide: 'SupabaseClient', useValue: supabase }],
})
export class AppModule {}
