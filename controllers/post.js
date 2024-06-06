const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const { title, content, slug, image, published, categoryId, tags } = req.body;
  try {
    const newPost = await prisma.post.create({
      //Crea un nuovo post nel database utilizzando Prisma
      data: {
        title,
        content,
        slug,
        image,
        published,
        category: { connect: { id: categoryId } },
        tags: { connect: tags.map((tagId) => ({ id: tagId })) },
      },
    });
    res.status(201).json(newPost); //stato 201 (Created) e restituisce il nuovo post creato
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Impossibile creare il post', details: error.message });
  }
};

exports.getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: true,
      },
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post non trovato' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Impossibile recuperare il post',
      details: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  const { published, keyword } = req.query;

  try {
    let where = { published: true }; //recupera solo i post pubblicati
    if (keyword) {
      // se presente parola chiave nalla ricerca, aggiunge condizione OR per cercare la parola chiave nel titolo o nel contenuto del post.
      where.OR = [
        { title: { contains: keyword, insensitive: true } },
        { content: { contains: keyword, insensitive: true } },
      ];
    }

    const posts = await prisma.post.findMany({
      //recupera post nel db e include le categorie e i tag associati a ciascun post
      where,
      include: {
        category: true,
        tags: true,
      },
    });

    res.status(200).json(posts); //stato 200 (OK) e restituisce tutti i post recuperati.
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Impossibile recuperare i post', details: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { slug } = req.params;
  const { title, content, published, categoryId, tags } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      //aggiorna un post nel database
      where: { slug },
      data: {
        title,
        content,
        published,
        categoryId,
        tags: {
          set: tags.map((tagId) => ({ id: tagId })),
        },
      },
    });
    res.status(200).json(updatedPost); //stato 200 (OK) e restituisce il post aggiornato
  } catch (error) {
    res.status(500).json({
      error: 'Impossibile aggiornare il post',
      details: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  const { slug } = req.params;
  try {
    await prisma.post.delete({
      //Elimina un post dal database
      where: { slug },
    });
    res.status(204).send(); //stato 204 (No Content) per indicare che il post è stato eliminato con successo
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Impossibile eliminare il post', details: error.message });
  }
};
