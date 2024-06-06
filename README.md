# EXPRESS API CRUD

Iniziamo a creare le API per il nostro blog:
Iniziate con un nuovo progetto Express + Prisma.

### Definizione degli endpoint

Vi chiediamo di definire i seguenti endpoint:

- POST /posts per creare un nuovo post.
- GET /posts/:slug per recuperare un post utilizzando il suo slug.
- GET /posts per recuperare tutti i post presenti nel database, con la possibilità di filtrare per:
- Post pubblicati.
- Post che contengono una determinata parola nel titolo o nel contenuto.
- PUT /posts/:slug per aggiornare un post.
- DELETE /posts/:slug per eliminare un post.

### BONUS:

- Implementare la paginazione.
- Gestire gli errori, restituendo uno stato HTTP 404 e un messaggio di errore, nel caso in cui una rotta non sia stata trovata.
- Gestire gli errori, restituendo uno stato HTTP 500 e un messaggio di errore, nel caso in cui venga sollevata un'eccezione dal Prisma Client.

### TEST EFFETTUATI PER TESTARE FUNZIONALITA' TRAMITE POSTMAN

### Nuova richiesta POST:

Metodo: POST

URL: http://localhost:3000/api/posts

Body->raw->JSON

{
"title": "Strategie di Gioco nella Pallavolo Moderna",
"content": "Nel corso degli anni, le strategie di gioco nella pallavolo hanno subito numerosi cambiamenti.",
"slug": "strategie-di-gioco-pallavolo-moderna",
"image": "https://www.shutterstock.com/image-illustration/volleyball-sport-field-plan-game-260nw-1375032872.jpg",
"published": true,
"categoryId": 1,
"tags": [1, 2]
}

SEND---------> OK

### Recuperare un post tramite slug:

Metodo: GET

URL: http://localhost:3000/api/posts/strategie-di-gioco-pallavolo-moderna

SEND---------> OK

### Recuperare tutti i post con filtri opzionali:

Metodo: GET

URL: http://localhost:3000/api/posts?published=true&search=pallavolo

SEND---------> OK

### Aggiornare un post tramite slug:

Metodo: PUT

URL: http://localhost:3000/api/posts/strategie-di-gioco-pallavolo-moderna

Body->raw->JSON

{
"title": "Strategie di Gioco nella Pallavolo Moderna Aggiornate",
"content": "Nel corso degli anni, le strategie di gioco nella pallavolo hanno subito numerosi cambiamenti.",
"image": "https://www.shutterstock.com/image-illustration/volleyball-sport-field-plan-game-260nw-1375032872.jpg",
"published": true,
"categoryId": 1,
"tags": [1, 2, 3]
}

SEND---------> OK

### Eliminare un post tramite slug:

Metodo: DELETE

URL: http://localhost:3000/api/posts/strategie-di-gioco-pallavolo-moderna

SEND---------> OK
