const express = require("express");
const router = express.Router();
const { loginAdmin, getAdminProfile } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createPosko,
  updatePosko,
  deletePosko,
  createAirBersih,
  updateAirBersih,
  deleteAirBersih,
  createTitikBanjir,
  updateTitikBanjir,
  deleteTitikBanjir,
  createJalanTergenang,
  toggleStatusJalan,
  deleteJalanTergenang,
  getPengaturanAmbang,
  updatePengaturanAmbang,
} = require("../controllers/adminCrudController");

// 1. Autentikasi Admin (Publik)
router.post("/login", loginAdmin);

// Seluruh rute di bawah ini diproteksi oleh JWT verifyToken
router.use(verifyToken);

// 2. Profil Admin
router.get("/me", getAdminProfile);

// 3. CRUD Posko Pengungsian (F07)
router.post("/posko", createPosko);
router.put("/posko/:id", updatePosko);
router.delete("/posko/:id", deletePosko);

// 4. CRUD Sumber Air Bersih (F08)
router.post("/air-bersih", createAirBersih);
router.put("/air-bersih/:id", updateAirBersih);
router.delete("/air-bersih/:id", deleteAirBersih);

// 5. CRUD Titik Banjir Historis (F10)
router.post("/titik-banjir", createTitikBanjir);
router.put("/titik-banjir/:id", updateTitikBanjir);
router.delete("/titik-banjir/:id", deleteTitikBanjir);

// 6. Penandaan Ruas Jalan Tergenang (F10)
router.post("/jalan-tergenang", createJalanTergenang);
router.patch("/jalan-tergenang/:id/status", toggleStatusJalan);
router.delete("/jalan-tergenang/:id", deleteJalanTergenang);

// 7. Pengaturan Ambang Waspada / Siaga (F10)
router.get("/pengaturan-ambang", getPengaturanAmbang);
router.put("/pengaturan-ambang/:id", updatePengaturanAmbang);

module.exports = router;
