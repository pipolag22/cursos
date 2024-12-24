import express from "express";
import Course from "../Models/Course.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//autenticacion

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Accesso denegado");

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Token invalido");
  }
};

//crear curso

router.post("/courses", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Acceso denegado");
  const { title, description, expiresAt } = req.body;
  try {
    const course = new Course({
      title,
      description,
      createdBy: req.user.id,
      expiresAt,
    });
    await course.save();
    res.status(201).send("curso creado");
  } catch (err) {
    res.status(400).send("Error al crear curso");
  }
});

//ver curso

router.get("/courses", auth, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

//registrar curso

router.post("/courses/:id/register", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send("Curso no encontrado");

    if (course.status !== "activo")
      return res.status(400).send("curso no disponible");

    // Aquí puedes agregar lógica para registrar el curso para el usuario

    res.send("Curso registrado");
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});
export default router;
