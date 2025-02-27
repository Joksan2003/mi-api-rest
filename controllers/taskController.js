const { tasksCollection } = require('../firebase');

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
    try {
        const snapshot = await tasksCollection.get();
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas", error });
    }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
    try {
        const doc = await tasksCollection.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea", error });
    }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    try {
        const newTask = { title: req.body.title };
        const docRef = await tasksCollection.add(newTask);
        res.status(201).json({ id: docRef.id, ...newTask });
    } catch (error) {
        res.status(500).json({ message: "Error al crear tarea", error });
    }
};

// Actualizar una tarea existente
exports.updateTask = async (req, res) => {
    try {
        const taskRef = tasksCollection.doc(req.params.id);
        const doc = await taskRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        await taskRef.update({ title: req.body.title });
        res.status(200).json({ id: req.params.id, title: req.body.title });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarea", error });
    }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
    try {
        const taskRef = tasksCollection.doc(req.params.id);
        const doc = await taskRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        await taskRef.delete();
        res.status(200).json({ message: "Tarea eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarea", error });
    }
};