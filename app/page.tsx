"use client";

import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  Slider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import ScienceIcon from "@mui/icons-material/Science";
import InsightsIcon from "@mui/icons-material/Insights";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const theme = createTheme({
  palette: {
    primary: { main: "#0035b1" },
    secondary: { main: "#0B1F3B" },
    background: { default: "#F2F2F2" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ["Inter", "system-ui", "Arial", "sans-serif"].join(","),
    h1: { fontWeight: 800, letterSpacing: -0.5 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
});

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">{label}</Typography>
        <Typography variant="h5" fontWeight={800}>{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const [tab, setTab] = React.useState(0);
  const [scenario, setScenario] = React.useState({
    modele: "baseline" as string,
    iterations: 10,
    note: "",
  });
  const [history, setHistory] = React.useState<Array<{ date: string; modele: string; iterations: number }>>([]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openNotice, setOpenNotice] = React.useState(false);

  const runScenario = () => {
    // simulation rapide
    setHistory((h) => [{ date: new Date().toLocaleString(), modele: scenario.modele, iterations: scenario.iterations }, ...h].slice(0, 5));
    setOpenSnack(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Stack spacing={2} alignItems="center" textAlign="center" mb={4}>
            <Chip icon={<ScienceIcon />} label="Prototype d'écran — IRT SystemX" color="primary" variant="outlined" />
            <Typography variant="h1" fontSize={{ xs: 28, md: 40 }}>Démonstrateur • Projet Énergie & Mobilité</Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={820}>
              Un écran unique pour illustrer une approche simple : aperçu des indicateurs, liste de données et exécution d'un scénario paramétré.
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button onClick={() => setOpenNotice(true)} startIcon={<HelpOutlineIcon />} variant="outlined">Notice 1 page</Button>
              <Button onClick={() => window.print()} variant="text">Imprimer</Button>
            </Stack>
          </Stack>

          {/* Tabs */}
          <Card sx={{ p: { xs: 2, md: 3 } }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }} aria-label="tabs-prototype">
              <Tab label="Aperçu" />
              <Tab label="Données" />
              <Tab label="Scénario" />
            </Tabs>
            <Divider sx={{ mb: 3 }} />

            {/* Aperçu */}
            {tab === 0 && (
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <KPI label="Temps moyen de calcul" value="1.2 s" />
                  <KPI label="Scénarios exécutés" value="128" />
                  <KPI label="Exactitude (val.)" value="97%" />
                </Stack>
                <Card variant="outlined">
                  <CardContent>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
                      <InsightsIcon />
                      <Box>
                        <Typography variant="h6">Résumé</Typography>
                        <Typography color="text.secondary">
                          Ce module présente un état synthétique du projet (KPIs) et un dernier résultat simulé.
                          L'objectif : montrer un aperçu lisible et opérationnel, sans dépendance back.
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            )}

            {/* Données */}
            {tab === 1 && (
              <Stack spacing={2}>
                <Typography variant="h6">Données récentes</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Source</TableCell>
                      <TableCell align="right">Valeur</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { date: "2025-09-01", src: "Capteur A", val: 12.4 },
                      { date: "2025-09-02", src: "Capteur B", val: 11.9 },
                      { date: "2025-09-03", src: "Capteur C", val: 13.1 },
                    ].map((r, i) => (
                      <TableRow key={i}>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>{r.src}</TableCell>
                        <TableCell align="right">{r.val}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Stack>
            )}

            {/* Scénario */}
            {tab === 2 && (
              <Stack spacing={3}>
                <Typography variant="h6">Exécuter un scénario</Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <Select
                    value={scenario.modele}
                    onChange={(e: SelectChangeEvent) =>
                      setScenario((s) => ({ ...s, modele: e.target.value }))
                    }
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="baseline">Modèle : Baseline</MenuItem>
                    <MenuItem value="avance">Modèle : Avancé</MenuItem>
                  </Select>
                  <Stack flex={1}>
                    <Typography variant="caption" color="text.secondary">Iterations : {scenario.iterations}</Typography>
                    <Slider
                      value={scenario.iterations}
                      min={1}
                      max={100}
                      onChange={(_, v) => setScenario((s) => ({ ...s, iterations: v as number }))}
                    />
                  </Stack>
                </Stack>
                <TextField
                  label="Note (optionnel)"
                  value={scenario.note}
                  onChange={(e) => setScenario((s) => ({ ...s, note: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
                  <Button variant="outlined" startIcon={<UploadFileIcon />}>Charger un jeu de données</Button>
                  <Button variant="contained" onClick={runScenario}>Lancer le scénario</Button>
                </Stack>
                <Divider />
                <Typography variant="subtitle2">Historique (dernier 5)</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Modèle</TableCell>
                      <TableCell align="right">Itérations</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Typography color="text.secondary">Aucun scénario exécuté pour l'instant.</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {history.map((h, i) => (
                      <TableRow key={i}>
                        <TableCell>{h.date}</TableCell>
                        <TableCell>{h.modele}</TableCell>
                        <TableCell align="right">{h.iterations}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Stack>
            )}
          </Card>
        </Container>
      </Box>

      {/* Snackbar */}
      <Snackbar open={openSnack} autoHideDuration={2500} onClose={() => setOpenSnack(false)}>
        <Alert severity="success" variant="filled" onClose={() => setOpenSnack(false)}>
          Scénario lancé (simulation)
        </Alert>
      </Snackbar>

      {/* Notice 1 page */}
      <Dialog open={openNotice} onClose={() => setOpenNotice(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Notice d'utilisation — Mini prototype
          <IconButton onClick={() => setOpenNotice(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <HelpOutlineIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Objectif</Typography>
            <Typography color="text.secondary">Illustrer un écran front-end simple utilisable pour un démonstrateur : aperçu, données, scénario.</Typography>
            <Typography variant="subtitle1">Ce que montre cet écran</Typography>
            <ul>
              <li><strong>Aperçu :</strong> 3 KPIs synthétiques pour situer l'état du projet.</li>
              <li><strong>Données :</strong> table minimaliste (exemple) pour lister des points récents.</li>
              <li><strong>Scénario :</strong> formulaire court, curseur d'itérations, upload fictif, historique local.</li>
            </ul>
            <Typography variant="subtitle1">Remplacement rapide</Typography>
            <ul>
              <li>Remplacer les valeurs mockées (KPIs, lignes de table) par les vôtres.</li>
              <li>Brancher le bouton "Lancer le scénario" sur une API en POST (selon votre stack).</li>
              <li>Adapter couleurs/texte à votre design interne.</li>
            </ul>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNotice(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
