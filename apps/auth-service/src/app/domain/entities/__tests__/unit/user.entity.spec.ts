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
    const spyOnUpdatedAt = jest.spyOn(sut, 'updatedAt', 'set');

    sut.email = newEmail;

    expect(sut.email).toEqual(newEmail);
    expect(spyOnUpdatedAt).toHaveBeenCalledTimes(1);
  });

  it('should be able to update user password', () => {
    const newPassword = 'newPassword';
    const spyOnUpdatedAt = jest.spyOn(sut, 'updatedAt', 'set');

    sut.password = newPassword;

    expect(sut.password).toEqual(newPassword);
    expect(spyOnUpdatedAt).toHaveBeenCalledTimes(1);
  });
});
