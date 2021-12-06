from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Route
from starlette.exceptions import HTTPException
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND
import databases
import sqlalchemy
from database import database
from models import cards, metadata, engine
import uvicorn  

'''
    Endpoint Controller - getCards
    Description - Gets all cards from the database
    Dependencies - None
'''
async def getCards(request):
    query = cards.select()
    await database.connect()
    results = await database.fetch_all(query)
    response = [
        {
            "id": result["id"],
            "type": result["type"],
            "title": result["title"],
            "position": result["position"],
            "imgUrl": result["imgUrl"]
        }
        for result in results
    ]
    if len(results) == 0:
        raise HTTPException(status_code = HTTP_404_NOT_FOUND, detail = "No cards found")
    return JSONResponse(response)

'''
    Endpoint Controller - addCard
    Description - Adds a single card to the database
    Dependencies - None
'''
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
        'response': "Card added"
    })
 
'''
    Endpoint Controller - updateCards
    Description - Updates the cards array in the database
    Dependencies - None
'''   
async def updateCards(request):
    data = await request.json()
    metadata.drop_all(engine)
    metadata.create_all(engine)
    await database.connect()
    query = cards.insert().values(data)
    await database.execute(query)
        
    return JSONResponse({
        'response': 'Cards updated'
    })

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'])
]

'''
    Defining routes
'''
app = Starlette(debug=True, routes=[
    Route('/get_cards', endpoint=getCards, methods=["GET"]),
    Route('/add_card', endpoint=addCard, methods=["POST"]),
    Route('/update_cards', endpoint=updateCards, methods=["POST"])
], middleware=middleware)

'''
    Running uvicorn server on port 8000
'''
if __name__=="__main__":
    uvicorn.run("server:app",host='127.0.0.1', port=8000, reload=True, debug=True, workers=3)