import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from '@supabase/supabase-js';
import { UsersModule } from './users/users.module';

const supabaseUrl = 'https://xxibjawyzuvhzzmblcim.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4aWJqYXd5enV2aHp6bWJsY2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4MTU5MzcsImV4cCI6MTk5NzM5MTkzN30.0XElYC64U_k0VCK4mIVIDSACw54cY35yxeZ9JVqfcvM';
const supabase = createClient(supabaseUrl, supabaseKey);

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, { provide: 'SupabaseClient', useValue: supabase }],
})
export class AppModule {}
