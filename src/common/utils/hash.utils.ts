import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashServices {
       private readonly saltRounds: number;
     constructor(){
        this.saltRounds = 10
     }
 
     async hashData (data: string): Promise<string> {
        const hash = await bcrypt.hash(data, this.saltRounds)
        return hash;
     }

     async verifyHash (data: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(data, hash);
     }

}