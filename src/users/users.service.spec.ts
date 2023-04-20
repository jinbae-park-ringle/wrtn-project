import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsers = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'jinbae', email: 'jinbae@example.com' },
    { id: 3, name: 'test', email: 'test@example.com' }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  
  describe('getUsers', () => {
    it('should return all mock users', async () => {
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({ data: mockUsers }),
      };
    
      jest.mock('@supabase/supabase-js', () => ({
        createClient: jest.fn(() => mockSupabase),
      }));
      service['supabase'] = mockSupabase;

      const result = await service.getUsers()
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUser', () => {
    it('should return the one mock user', async () => {
      const specific_id = 3 // 1~3 가능
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockUsers[specific_id - 1] }),
      };
    
      jest.mock('@supabase/supabase-js', () => ({
        createClient: jest.fn(() => mockSupabase),
      }));
      service['supabase'] = mockSupabase;

      const result = await service.getUser(specific_id - 1);
      const test_user = mockUsers[specific_id - 1]

      expect(result).toEqual(test_user);
    });
  });

  describe('createUser', () => {
    it('should create the one mock user', async () => {
      const newUser = { id: 4, name: 'Jane', email: 'jane@example.com' }
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: newUser }),
      }

      jest.mock('@supabase/supabase-js', () => ({
        createClient: jest.fn(() => mockSupabase),
      }));
      service['supabase'] = mockSupabase;

      const result = await service.createUser('jane@example.com', 'Jane', '1234567');
      
      expect(result).toEqual(newUser);
    });
  });

  describe('updateUser', () => {
    it('should update the one mock user', async () => {
      const updatedUserInFuture = { id: 3, name: 'updated_name', email: 'test@example.com' }
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: updatedUserInFuture }),
      }

      jest.mock('@supabase/supabase-js', () => ({
        createClient: jest.fn(() => mockSupabase),
      }));
      service['supabase'] = mockSupabase;

      const fieldsToUpdate = { name: "updated_name" }
      const result = await service.updateUser(3, fieldsToUpdate)
      
      expect(result["name"]).toEqual(updatedUserInFuture["name"]);
    });
  });

  describe('deleteUser', () => {
    it('should delete the one mock user', async () => {
      const specific_id = 2 // 1~3 가능
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockUsers[specific_id - 1] }),
      }

      jest.mock('@supabase/supabase-js', () => ({
        createClient: jest.fn(() => mockSupabase),
      }));
      service['supabase'] = mockSupabase;

      const result = await service.deleteUser(specific_id);
      const deletedUserInFuture = mockUsers[specific_id - 1];

      expect(result).toEqual(deletedUserInFuture);
    });
  });
});
