// src/.../IAPlagio.jsx

import React, { useState, useRef } from "react";
import {
  Container,
  HeaderPlagio,
  UploadSection,
  DropZone,
  FileInfo,
  FileName,
  FileSize,
  AnalyzeButton,
  ResultsSection,
  OverviewCards,
  MetricCard,
  MetricIcon,
  MetricValue,
  MetricLabel,
  DetailedReport,
  ReportSection,
  SectionHeader,
  SourcesList,
  SourceCard,
  SourceType,
  SourceInfo,
  SourceTitle,
  SourceMatch,
  SourceLink,
  ChartContainer,
  ProgressRing,
  ProgressText,
  AlertSection,
  AlertCard,
  ComparisonText,
  CopiedText,
  AnalyzingOverlay,
  AnalyzingContent,
  AnalyzingStep,
  StepIcon,
  StepText,
  LoadingBar,
  RemoveFileButton,
  HighlightedDocumentWrapper,
  HighlightedDocumentTitle,
  HighlightedDocumentInfo,
  HighlightedDocumentBox,
  HighlightSpan,
  HighlightLegend,
  LegendItem,
  LegendColor,
} from "../../../style/docente/iaPlagioDStyled";

import {
  Upload,
  FileText as FileTextIcon,
  AlertTriangle,
  CheckCircle,
  Globe,
  Book,
  Users,
  Bot,
  ExternalLink,
  TrendingUp,
  Shield,
  Search,
  Download,
  X,
  Database,
  Cpu,
  FileSearch,
  BarChart3,
  History,
} from "lucide-react";
import { useColors } from "../../../style/colors";
import CardHeader from "../../../components/ui/cardHeader";
import { toast } from "sonner";

const API_BASE = "http://localhost:3000";

const IAPlagio = () => {
  const ColorsDoc = useColors();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [historyList, setHistoryList] = useState([]);

  const analysisSteps = [
    { icon: Upload, text: "Cargando documento...", duration: 800 },
    { icon: FileSearch, text: "Extrayendo texto y analizando estructura...", duration: 1200 },
    { icon: Database, text: "Comparando con base de datos universitaria...", duration: 1400 },
    { icon: Globe, text: "Buscando coincidencias en internet...", duration: 1400 },
    { icon: Cpu, text: "Detectando patrones de IA...", duration: 1000 },
    { icon: BarChart3, text: "Generando reporte de análisis...", duration: 800 },
  ];

  const getGlobalRisk = (r) => {
    const riesgoBruto = r.plagioWeb + r.plagioUniversidad + r.contenidoIA;
    if (riesgoBruto >= 60 || r.originalidad < 55) {
      return { nivel: "Alto", color: "#EF4444", desc: "Riesgo alto de plagio / IA" };
    }
    if (riesgoBruto >= 35 || r.originalidad < 65) {
      return { nivel: "Medio", color: "#F97316", desc: "Revisión detallada recomendada" };
    }
    return { nivel: "Bajo", color: "#22C55E", desc: "Riesgo controlado" };
  };

  const validateFile = (uploadedFile) => {
    if (!uploadedFile) return "No se seleccionó ningún archivo.";

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowed.includes(uploadedFile.type) && !uploadedFile.name.endsWith(".txt")) {
      return "Formato no soportado. Usa PDF, DOC, DOCX o TXT.";
    }

    const maxSizeMB = 10;
    if (uploadedFile.size > maxSizeMB * 1024 * 1024) {
      return `El archivo supera los ${maxSizeMB} MB permitidos.`;
    }

    return "";
  };

  const simulateFileUpload = (uploadedFile) => {
    const validationError = validateFile(uploadedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      setUploadProgress(0);
      setResults(null);
      toast.error(validationError);
      return;
    }

    setError("");
    setFile(uploadedFile);
    setResults(null);
    setUploadProgress(0);

    if (
      uploadedFile.type === "text/plain" ||
      uploadedFile.name.toLowerCase().endsWith(".txt")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result || "";
        const words = text
          .toString()
          .split(/\s+/)
          .filter((w) => w.trim().length > 0).length;
        setWordCount(words);
      };
      reader.readAsText(uploadedFile);
    } else {
      const estimatedWords = Math.round(uploadedFile.size / 6);
      setWordCount(estimatedWords);
    }

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 120);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      simulateFileUpload(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      simulateFileUpload(droppedFile);
    }
  };


  const analyzeDocument = async () => {
    if (!file) {
      toast.warning("Primero selecciona un archivo para analizar.");
      return;
    }
    if (uploadProgress < 100) {
      toast.info("Espera a que el archivo termine de cargarse.");
      return;
    }

    setAnalyzing(true);
    setCurrentStep(0);
    setResults(null);

    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, analysisSteps[i].duration));
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(`${API_BASE}/api/plagio/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Error subiendo el archivo para análisis.");
      }

      const uploadData = await uploadRes.json();
      const documentoId = uploadData.documentoId;

      if (!documentoId) {
        throw new Error("El backend no devolvió un documentoId.");
      }

      const res = await fetch(`${API_BASE}/api/plagio/analizar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentoId }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Respuesta análisis:", res.status, text);
        throw new Error("Error al analizar el documento.");
      }

      const data = await res.json();
      setResults(data);

      const risk = getGlobalRisk(data);

      setHistoryList((prev) => {
        const nuevo = [
          {
            id: Date.now(),
            nombre: file.name,
            fecha: data.fechaAnalisis,
            originalidad: data.originalidad,
            riesgo: risk.nivel,
            riesgoColor: risk.color,
          },
          ...prev,
        ];
        return nuevo.slice(0, 4);
      });

      toast.success("Análisis completado correctamente.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Ocurrió un error al analizar el documento.");
    } finally {
      setAnalyzing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setResults(null);
    setUploadProgress(0);
    setWordCount(0);
    setError("");
  };

  const getColorByPercentage = (value) => {
    if (value >= 80) return "#4ECDC4";
    if (value >= 60) return "#22C55E";
    if (value >= 40) return "#F97316";
    return "#EF4444";
  };

  const getSourceIcon = (tipo) => {
    switch (tipo) {
      case "web":
        return Globe;
      case "universidad":
        return Users;
      case "libro":
        return Book;
      case "ia":
        return Bot;
      default:
        return FileTextIcon;
    }
  };

  const renderHighlightedDocument = () => {
    if (!results || !results.textoOriginal) return null;

    const texto = results.textoOriginal;
    if (!texto || texto.length === 0) return null;

    const fragmentos = (results.fragmentos || [])
      .filter(
        (f) =>
          typeof f.inicio === "number" &&
          typeof f.fin === "number" &&
          f.inicio >= 0 &&
          f.fin > f.inicio &&
          f.fin <= texto.length
      )
      .sort((a, b) => a.inicio - b.inicio);

    const partes = [];
    let cursor = 0;

    fragmentos.forEach((fr, index) => {
      if (fr.inicio > cursor) {
        partes.push(
          <span key={`plain-${index}`}>
            {texto.slice(cursor, fr.inicio)}
          </span>
        );
      }

      partes.push(
        <HighlightSpan key={`hl-${index}`} tipo={fr.tipo}>
          {texto.slice(fr.inicio, fr.fin)}
        </HighlightSpan>
      );

      cursor = fr.fin;
    });

    if (cursor < texto.length) {
      partes.push(
        <span key="plain-final">
          {texto.slice(cursor)}
        </span>
      );
    }

    return (
      <HighlightedDocumentWrapper>
        <HighlightedDocumentTitle>
          Documento con fragmentos resaltados
        </HighlightedDocumentTitle>
        <HighlightedDocumentInfo>
          Los segmentos detectados como similares se muestran subrayados y con
          un color distinto según su origen (web, repositorio UNIFRANZ o IA).
        </HighlightedDocumentInfo>
        <HighlightedDocumentBox>
          {partes}
        </HighlightedDocumentBox>

        <HighlightLegend>
          <LegendItem>
            <LegendColor
              bg="rgba(34, 197, 94, 0.4)"
              border="#22c55e"
            />
            <span>Texto original</span>
          </LegendItem>
          <LegendItem>
            <LegendColor
              bg="rgba(239, 68, 68, 0.4)"
              border="#ef4444"
            />
            <span>Coincidencias web</span>
          </LegendItem>
          <LegendItem>
            <LegendColor
              bg="rgba(249, 115, 22, 0.4)"
              border="#f97316"
            />
            <span>Repositorio UNIFRANZ</span>
          </LegendItem>
          <LegendItem>
            <LegendColor
              bg="rgba(139, 92, 246, 0.4)"
              border="#8b5cf6"
            />
            <span>Patrones de IA</span>
          </LegendItem>
        </HighlightLegend>
      </HighlightedDocumentWrapper>
    );
  };


  const handleDownloadReport = () => {
    if (!results || !file) {
      toast.info("No hay resultados para descargar.");
      return;
    }

    const risk = getGlobalRisk(results);

    const resumen = [
      `Reporte de análisis de plagio`,
      `Archivo: ${file.name}`,
      `Fecha de análisis: ${results.fechaAnalisis}`,
      ``,
      `Resumen:`,
      `- Originalidad: ${results.originalidad}%`,
      `- Plagio Web: ${results.plagioWeb}%`,
      `- Coincidencias con proyectos UNIFRANZ: ${results.plagioUniversidad}%`,
      `- Contenido con patrones de IA: ${results.contenidoIA}%`,
      `- Nivel de riesgo global: ${risk.nivel} (${risk.desc})`,
      ``,
      `Palabras analizadas: ${results.palabrasAnalizadas}`,
      `Frases analizadas: ${results.frasesAnalizadas}`,
      ``,
      `Fuentes detectadas:`,
      ...results.fuentes.map(
        (f, i) =>
          `${i + 1}. [${f.tipo.toUpperCase()}] ${f.titulo} - ${f.autor} (Coincidencia: ${f.coincidencia}%)`
      ),
      ``,
    ].join("\n");

    const blob = new Blob([resumen], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_plagio_${file.name.replace(/\.[^/.]+$/, "")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentStepPercent =
    analysisSteps.length === 0
      ? 0
      : Math.round(((currentStep + 1) / analysisSteps.length) * 100);

  return (
    <Container>
      <CardHeader ColorsMa={ColorsDoc} title="Detector de Plagio" />

      <UploadSection>
        <DropZone
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          hasFile={!!file}
          isDragging={isDragging}
          onClick={() => {
            if (!file && fileInputRef.current) fileInputRef.current.click();
          }}
        >
          {!file ? (
            <>
              <Upload size={48} color={isDragging ? ColorsDoc.primary : "#9ca3af"} />
              <h3>Arrastra el documento aquí</h3>
              <p>o haz clic para seleccionar</p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: "none" }}
              />
              <button
                type="button"
                style={{ background: ColorsDoc.primary, marginTop: "0.75rem" }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                Seleccionar Archivo
              </button>
              <span>Formatos soportados: PDF, DOC, DOCX, TXT • Máx 10MB</span>
              {error && (
                <p style={{ color: "#EF4444", marginTop: "0.5rem", fontSize: "0.85rem" }}>
                  {error}
                </p>
              )}
            </>
          ) : (
            <FileInfo>
              <FileTextIcon size={48} color={ColorsDoc.primary} />
              <FileName>{file.name}</FileName>
              <FileSize>{(file.size / 1024 / 1024).toFixed(2)} MB</FileSize>
              {wordCount > 0 && (
                <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                  ~{wordCount} palabras estimadas
                </span>
              )}

              {uploadProgress < 100 ? (
                <LoadingBar>
                  <div style={{ width: `${uploadProgress}%` }} />
                  <span>Cargando... {uploadProgress}%</span>
                </LoadingBar>
              ) : (
                <>
                  <AnalyzeButton
                    onClick={analyzeDocument}
                    disabled={analyzing}
                    style={{ background: ColorsDoc.primary }}
                  >
                    {analyzing ? (
                      <>
                        <Search size={20} className="spinning" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <Search size={20} />
                        Iniciar Análisis Completo
                      </>
                    )}
                  </AnalyzeButton>
                  <RemoveFileButton type="button" onClick={removeFile}>
                    <X size={18} />
                    Remover archivo
                  </RemoveFileButton>
                </>
              )}
            </FileInfo>
          )}
        </DropZone>
      </UploadSection>

      {analyzing && (
        <AnalyzingOverlay>
          <AnalyzingContent>
            <Shield size={64} color={ColorsDoc.primary} className="shield-pulse" />
            <h2>Analizando documento</h2>
            <p>Por favor espera mientras se completa el proceso...</p>

            <div style={{ width: "100%", marginTop: "1rem" }}>
              <LoadingBar>
                <div style={{ width: `${currentStepPercent}%` }} />
                <span>{currentStepPercent}%</span>
              </LoadingBar>
            </div>

            <div style={{ width: "100%", marginTop: "2rem" }}>
              {analysisSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === index;
                const isCompleted = currentStep > index;

                return (
                  <AnalyzingStep key={index} active={isActive} completed={isCompleted}>
                    <StepIcon active={isActive} completed={isCompleted}>
                      <Icon size={20} />
                    </StepIcon>
                    <StepText active={isActive} completed={isCompleted}>
                      {step.text}
                    </StepText>
                  </AnalyzingStep>
                );
              })}
            </div>
          </AnalyzingContent>
        </AnalyzingOverlay>
      )}

      {results && (
        <ResultsSection>
          {/* Resumen superior */}
          <div
            style={{
              background: "white",
              padding: "1rem",
              borderRadius: "12px",
              marginBottom: "1rem",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#6b7280",
                fontSize: "0.9rem",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <span>📄 Archivo: {file?.name}</span>
              <span>📅 Análisis: {results.fechaAnalisis}</span>
              <span>⏱️ Tiempo: {results.tiempoAnalisis}</span>
              <span>📝 {results.palabrasAnalizadas} palabras</span>
              <span>📊 {results.frasesAnalizadas} frases</span>
            </div>
          </div>

          {(() => {
            const risk = getGlobalRisk(results);
            return (
              <div
                style={{
                  background: `${risk.color}15`,
                  border: `1px solid ${risk.color}40`,
                  borderRadius: "12px",
                  padding: "0.75rem 1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <AlertTriangle size={20} color={risk.color} />
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: risk.color,
                      fontSize: "0.95rem",
                    }}
                  >
                    Nivel de riesgo: {risk.nivel}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#4b5563" }}>
                    {risk.desc}
                  </div>
                </div>
              </div>
            );
          })()}

          <OverviewCards>
            <MetricCard>
              <MetricIcon
                style={{
                  background: `${getColorByPercentage(results.originalidad)}15`,
                }}
              >
                <CheckCircle
                  size={32}
                  color={getColorByPercentage(results.originalidad)}
                />
              </MetricIcon>
              <MetricValue style={{ color: getColorByPercentage(results.originalidad) }}>
                {results.originalidad}%
              </MetricValue>
              <MetricLabel>Contenido Original</MetricLabel>
              <small style={{ color: "#9ca3af", marginTop: "0.5rem" }}>
                {results.originalidad >= 60
                  ? "✅ Dentro de rango aceptable"
                  : "⚠️ Revisión obligatoria recomendada"}
              </small>
            </MetricCard>

            <MetricCard>
              <MetricIcon style={{ background: "#FF6B6B15" }}>
                <Globe size={32} color="#FF6B6B" />
              </MetricIcon>
              <MetricValue style={{ color: "#FF6B6B" }}>
                {results.plagioWeb}%
              </MetricValue>
              <MetricLabel>Plagio Web</MetricLabel>
              <small style={{ color: "#9ca3af", marginTop: "0.5rem" }}>
                {results.fuentes.filter((f) => f.tipo === "web").length} fuentes externas
              </small>
            </MetricCard>

            <MetricCard>
              <MetricIcon style={{ background: "#FFA50015" }}>
                <Users size={32} color="#FFA500" />
              </MetricIcon>
              <MetricValue style={{ color: "#FFA500" }}>
                {results.plagioUniversidad}%
              </MetricValue>
              <MetricLabel>Proyectos UNIFRANZ</MetricLabel>
              <small style={{ color: "#9ca3af", marginTop: "0.5rem" }}>
                {
                  results.fuentes.filter((f) => f.tipo === "universidad").length
                }{" "}
                coincidencias internas
              </small>
            </MetricCard>

            <MetricCard>
              <MetricIcon style={{ background: "#9B59B615" }}>
                <Bot size={32} color="#9B59B6" />
              </MetricIcon>
              <MetricValue style={{ color: "#9B59B6" }}>
                {results.contenidoIA}%
              </MetricValue>
              <MetricLabel>Patrones de IA</MetricLabel>
              <small style={{ color: "#9ca3af", marginTop: "0.5rem" }}>
                {results.contenidoIA > 10
                  ? "⚠️ Comportamiento de IA detectado"
                  : "✅ Sin patrones críticos"}
              </small>
            </MetricCard>
          </OverviewCards>

          <ChartContainer>
            <ProgressRing>
              <svg width="200" height="200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e9ecef"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={getColorByPercentage(results.originalidad)}
                  strokeWidth="20"
                  strokeDasharray={`${results.originalidad * 5.02} 502`}
                  strokeDashoffset="125"
                  strokeLinecap="round"
                  style={{ transition: "all 1s ease" }}
                />
              </svg>
              <ProgressText>
                <span>{results.originalidad}%</span>
                <label>Original</label>
              </ProgressText>
            </ProgressRing>

            <div style={{ flex: 1, padding: "0 2rem" }}>
              <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>
                Distribución del Contenido
              </h3>
              {[
                {
                  label: "Original",
                  value: results.originalidad,
                  color: getColorByPercentage(results.originalidad),
                },
                { label: "Web", value: results.plagioWeb, color: "#EF4444" },
                {
                  label: "Universidad",
                  value: results.plagioUniversidad,
                  color: "#F97316",
                },
                { label: "IA", value: results.contenidoIA, color: "#8B5CF6" },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                      {item.label}
                    </span>
                    <span
                      style={{
                        color: item.color,
                        fontWeight: "600",
                      }}
                    >
                      {item.value}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      background: "#e9ecef",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.value}%`,
                        height: "100%",
                        background: item.color,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>

          {results.alertas.length > 0 && (
            <AlertSection>
              <SectionHeader>
                <AlertTriangle size={24} color="#EF4444" />
                Alertas Detectadas
              </SectionHeader>
              {results.alertas.map((alerta, index) => (
                <AlertCard key={index} nivel={alerta.nivel}>
                  <AlertTriangle size={20} />
                  {alerta.mensaje}
                </AlertCard>
              ))}
            </AlertSection>
          )}

          <DetailedReport>
            <ReportSection>
              <SectionHeader>
                <FileTextIcon size={24} />
                Fuentes Detectadas ({results.fuentes.length})
              </SectionHeader>

              <SourcesList>
                {results.fuentes.map((fuente, index) => {
                  const Icon = getSourceIcon(fuente.tipo);
                  return (
                    <SourceCard key={index}>
                      <SourceType tipo={fuente.tipo}>
                        <Icon size={20} />
                        {fuente.tipo.toUpperCase()}
                      </SourceType>

                      <SourceInfo>
                        <SourceTitle>{fuente.titulo}</SourceTitle>
                        <p>Autor/Fuente: {fuente.autor}</p>
                        <SourceMatch>
                          <TrendingUp size={16} />
                          Coincidencia: {fuente.coincidencia}%
                        </SourceMatch>
                      </SourceInfo>

                      {fuente.url && (
                        <SourceLink
                          href={fuente.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink size={18} />
                          Ver fuente
                        </SourceLink>
                      )}
                    </SourceCard>
                  );
                })}
              </SourcesList>
            </ReportSection>

            <ReportSection>
              <SectionHeader>Fragmentos Detectados</SectionHeader>

              <ComparisonText>
                {results.fragmentos.map((fragmento, index) => {
                  const Icon = getSourceIcon(fragmento.tipo);
                  return (
                    <div key={index} style={{ marginBottom: "1.5rem" }}>
                      <CopiedText tipo={fragmento.tipo}>
                        "{fragmento.original}"
                      </CopiedText>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.9rem",
                          marginTop: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Icon size={16} />
                        Fuente: {fragmento.fuente} ({fragmento.tipo})
                      </p>
                    </div>
                  );
                })}
              </ComparisonText>
            </ReportSection>
          </DetailedReport>
          {renderHighlightedDocument()}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              style={{
                background: ColorsDoc.primary,
                color: "white",
                padding: "0.75rem 2rem",
                borderRadius: "10px",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={handleDownloadReport}
            >
              <Download size={20} />
              Descargar Reporte
            </button>
            <button
              type="button"
              style={{
                background: "white",
                color: ColorsDoc.primary,
                padding: "0.75rem 2rem",
                borderRadius: "10px",
                border: `2px solid ${ColorsDoc.primary}`,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={removeFile}
            >
              <FileTextIcon size={20} />
              Analizar Otro Documento
            </button>
          </div>

          {historyList.length > 0 && (
            <div
              style={{
                marginTop: "2rem",
                background: "white",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <History size={18} color={ColorsDoc.primary} />
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#111827",
                  }}
                >
                  Últimos análisis realizados
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "#4b5563" }}>
                {historyList.map((h) => (
                  <div
                    key={h.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.45rem 0",
                      borderTop: "1px dashed #e5e7eb",
                    }}
                  >
                    <span
                      style={{
                        maxWidth: "50%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {h.nombre}
                    </span>
                    <span style={{ color: "#6b7280" }}>{h.fecha}</span>
                    <span style={{ fontWeight: 600 }}>
                      {h.originalidad}% orig.
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        background: `${h.riesgoColor}15`,
                        color: h.riesgoColor,
                        fontWeight: 600,
                      }}
                    >
                      {h.riesgo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ResultsSection>
      )}
    </Container>
  );
};

export default IAPlagio;
