import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}

/**
*         **  @Index() Utility  **
*
 1)
 @Index()
 // accelerate req like:
SELECT * FROM event WHERE name = 'recommend_coffee';

 2)
@Index(['name', 'type'])
// Optimizes queries that filter by multiple columns.
SELECT * FROM event WHERE name = 'recommend_coffee' AND type = 'coffee';

 */
