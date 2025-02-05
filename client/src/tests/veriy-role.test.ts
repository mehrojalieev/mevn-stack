import {expect, test,  describe} from 'vitest'
import VerifyRole from '../helpers/verify-role'


describe('VerifyRole', () => {
 
    test('If token is not provided', () =>{
        expect(VerifyRole(null)).toBeNull()
    })

    test('If token is invalid', () => {
        expect(() => VerifyRole('invalid-token')).toThrow('Invalid JWT format')
    })
})