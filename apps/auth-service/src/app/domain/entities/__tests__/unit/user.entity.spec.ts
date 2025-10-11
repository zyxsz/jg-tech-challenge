import { UserDataBuilder } from '../../../testing/helpers/user-data.builder';
import { User } from '../../user.entity';

describe('User entity unit tests', () => {
  let sut: User;

  beforeEach(() => {
    sut = User.create(UserDataBuilder.build());
  });

  it('should be able to create user entity', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to update user email', () => {
    const newEmail = 'newEmail@example.com';
    const updatedAt = sut.updatedAt;

    sut.email = newEmail;

    expect(sut.email).toEqual(newEmail);
    expect(sut.updatedAt).not.toEqual(updatedAt);
  });

  it('should be able to update user password', () => {
    const newPassword = 'newPassword';
    const updatedAt = sut.updatedAt;

    sut.password = newPassword;

    expect(sut.password).toEqual(newPassword);
    expect(sut.updatedAt).not.toEqual(updatedAt);
  });
});
