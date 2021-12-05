import sqlalchemy
import asyncio
from models import cards, metadata, engine
from database import database

seeding_data = [
    { "type": "bank-draft", "title": "Bank Draft", "position": "0" ,"imgUrl": 'https://robohash.org/voluptatesaliquidet.png?size=50x50&set=set1'}, 
    { "type": "bill-of-lading", "title": "Bill of Landing", "position": "1" ,"imgUrl": "https://robohash.org/molestiaeatquefuga.png?size=50x50&set=set1" },
    {"type": "invoice", "title": "Invoice", "position": "2" ,"imgUrl": "https://robohash.org/minimadebitisvoluptatem.png?size=50x50&set=set1"}, 
    {"type": "bank-draft-2", "title": "Bank Draft2", "position": "3" ,"imgUrl": "https://robohash.org/debitisasperioressed.png?size=50x50&set=set1"},
    {"type": "bill-of-lading-2", "title":"Bill of Landing 2", "position": "4","imgUrl": "https://robohash.org/molestiaeatquefuga.png?size=50x50&set=set1"}
]

metadata.drop_all(engine)
metadata.create_all(engine)

async def seed_database():
    await database.connect()
    query = cards.insert().values(seeding_data)
    await database.execute(query)
    
if __name__=="__main__":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed_database())

