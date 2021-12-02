from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
import databases
import sqlalchemy
from database import database
from models import cards

async def getCards(request):
    query = cards.select()
    await database.connect()
    results = await database.fetch_all(query)
    response = [
        {
            "id": result["id"],
            "type": result["type"],
            "title": result["title"],
            "completed": result["imgUrl"]
        }
        for result in results
    ]
    return JSONResponse(response)
    
async def addCard(request):
    data = await request.json()
    query = cards.insert().values(
        type=data['type'],
        title=data['title'],
        imgUrl=data['imgUrl']
    )
    await database.connect()
    await database.execute(query)
    return JSONResponse({
        'Done': 'done'
    })

app = Starlette(debug=True, routes=[
    Route('/get_cards', endpoint=getCards, methods=["GET"]),
    Route('/add_card', endpoint=addCard, methods=["POST"])
])