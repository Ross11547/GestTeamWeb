// src/screens/Estudiante/ProyectoUno.jsx - Diseño Premium Completo
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { api } from '../../../services/api';
import { toast } from 'sonner';
import CardHeader from '../../../components/ui/cardHeader';
import { useColors } from '../../../style/colors';
import {
  Github,
  GitBranch,
  GitCommit,
  Link2,
  Download,
  Users,
  Plus,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  X,
  AlertCircle,
  Loader2,
  FolderGit2,
  User,
  Building,
  Zap,
  ChevronDown,
  ChevronUp,
  Settings,
  Code2,
  BookOpen,
  Shield,
  Sparkles,
  Rocket,
  Target,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  GraduationCap
} from 'lucide-react';

// ==== ANIMACIONES ====
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// ==== ESTILOS PARA ROTACIÓN ====
const GlobalStyle = styled.div`
  .rotating {
    animation: ${rotate} 1s linear infinite;
  }
`;

// ==== CONTENEDORES PRINCIPALES ====
const MainContainer = styled.div`
  animation: ${fadeIn} 0.4s ease;
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  animation: ${slideIn} 0.3s ease;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  }
`;

// ==== HEADER Y TOOLBAR ====
const HeaderSection = styled.div`
  margin-bottom: 24px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  position: relative;
  overflow: hidden;
  
  ${({ $variant, Colors }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${Colors.primary};
          color: white;
          box-shadow: 0 4px 12px ${Colors.primary}30;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px ${Colors.primary}40;
            background: ${Colors.primary}ee;
          }
        `;
      case 'success':
        return `
          background: #10B981;
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
            background: #059669;
          }
        `;
      case 'danger':
        return `
          background: #EF4444;
          color: white;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
            background: #DC2626;
          }
        `;
      default:
        return `
          background: white;
          color: #374151;
          border: 2px solid #e5e7eb;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            border-color: ${Colors.primary};
            color: ${Colors.primary};
          }
        `;
    }
  }}
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  svg {
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: ${({ $loading }) => $loading ? 'none' : 'scale(1.1)'};
  }
`;

// ==== TAGS DE ESTADO ====
const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatusCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: ${({ $ok }) => $ok ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : 'linear-gradient(135deg, #fef2f2, #fee2e2)'};
  border: 2px solid ${({ $ok }) => $ok ? '#86efac' : '#fca5a5'};
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${({ $ok }) => $ok ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  }
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${({ $ok }) => $ok ? '#22c55e' : '#ef4444'};
  border-radius: 12px;
  color: white;
  flex-shrink: 0;
`;

const StatusInfo = styled.div`
  flex: 1;
`;

const StatusLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ $ok }) => $ok ? '#15803d' : '#991b1b'};
  margin-bottom: 4px;
`;

const StatusValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ $ok }) => $ok ? '#166534' : '#7f1d1d'};
`;

// ==== FORMULARIO DE CREACIÓN ====
const CreateSection = styled.div`
  background: linear-gradient(135deg, #fef3c7, #fef9c3);
  border: 2px solid #fde047;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  animation: ${fadeIn} 0.3s ease;
`;

const CreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #713f12;
  
  svg {
    color: #f59e0b;
  }
`;

const CreateForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #713f12;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 2px solid #fed7aa;
  border-radius: 12px;
  font-size: 15px;
  background: white;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ Colors }) => Colors.primary};
    box-shadow: 0 0 0 4px ${({ Colors }) => Colors.primary}20;
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 14px 16px;
  border: 2px solid #fed7aa;
  border-radius: 12px;
  font-size: 15px;
  background: white;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ Colors }) => Colors.primary};
    box-shadow: 0 0 0 4px ${({ Colors }) => Colors.primary}20;
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${({ Colors }) => Colors.primary};
  }
`;

// ==== TABLA PREMIUM ====
const TableContainer = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-bottom: 2px solid #e5e7eb;
`;

const TableTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 999px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const Thead = styled.thead`
  background: linear-gradient(180deg, #f9fafb, #f3f4f6);
`;

const Th = styled.th`
  text-align: left;
  padding: 16px 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
  border-bottom: 2px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: inherit;
  z-index: 1;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(90deg, transparent, #f9fafb, transparent);
    
    td {
      color: #111827;
    }
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

const Td = styled.td`
  padding: 20px;
  font-size: 14px;
  color: #374151;
  transition: color 0.2s ease;
`;

const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProjectIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${({ Colors }) => Colors.primary}20, ${({ Colors }) => Colors.primary}10);
  border-radius: 12px;
  color: ${({ Colors }) => Colors.primary};
  flex-shrink: 0;
`;

const ProjectInfo = styled.div``;

const ProjectName = styled.div`
  font-weight: 700;
  color: #111827;
  margin-bottom: 2px;
`;

const ProjectMeta = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: ${({ $type }) => {
    switch ($type) {
      case 'group': return 'linear-gradient(135deg, #dbeafe, #bfdbfe)';
      case 'individual': return 'linear-gradient(135deg, #f3e8ff, #e9d5ff)';
      case 'leader': return 'linear-gradient(135deg, #fef3c7, #fed7aa)';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'group': return '#1e40af';
      case 'individual': return '#6b21a8';
      case 'leader': return '#92400e';
      default: return '#374151';
    }
  }};
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

const RepoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  color: #0369a1;
  border-radius: 10px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #e0f2fe, #bae6fd);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: ${({ $primary, Colors }) => $primary ? Colors.primary : 'white'};
  color: ${({ $primary, Colors }) => $primary ? 'white' : Colors.primary};
  border: 2px solid ${({ Colors }) => Colors.primary};
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ Colors }) => Colors.primary}30;
    background: ${({ $primary, Colors }) => $primary ? Colors.primary + 'ee' : Colors.primary + '10'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ==== EMPTY STATE ====
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 24px;
  margin-bottom: 24px;
  color: #9ca3af;
  animation: ${pulse} 2s ease infinite;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`;

const EmptyText = styled.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #6b7280;
  max-width: 400px;
`;

// ==== LOADING STATE ====
const LoadingOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
`;

const LoadingSpinner = styled(Loader2)`
  animation: ${rotate} 1s linear infinite;
  color: ${({ Colors }) => Colors.primary};
`;

// ==== HELP TEXT ====
const HelpSection = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 16px;
  border: 2px solid #bae6fd;
  margin-top: 24px;
`;

const HelpTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 8px;
`;

const HelpText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #0c4a6e;
  line-height: 1.6;
  
  b {
    color: #075985;
  }
`;

// ==== MOCK MATERIAS (SIMULACIÓN) ====
const MOCK_MATERIAS = [
  {
    id: 1,
    nombre: 'Proyecto Integrador Intermedio III',
    codigo: 'PII',
    carrera: { nombre: 'Ingeniería de Sistemas' },
  },
  {
    id: 2,
    nombre: 'Redes II',
    codigo: 'RED',
    carrera: { nombre: 'Ingeniería de Sistemas' },
  },
  {
    id: 3,
    nombre: 'Sistemas de control',
    codigo: 'SCO',
    carrera: { nombre: 'Ingeniería de Sistemas' },
  },
];

function ProjectsPanel() {
  const Colors = useColors();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [materias, setMaterias] = useState(MOCK_MATERIAS);

  const [form, setForm] = useState({
    titulo: '',
    tipoGrupo: 'GROUP',
    materiaId: '',
    codigoMateria: '',
  });
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.myProjects();
      setItems(r.projects || []);
    } catch (e) {
      toast.error('Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  };

  const onMateriaChange = (e) => {
    const materiaId = e.target.value;
    const m = materias.find((x) => String(x.id) === String(materiaId));
    setForm((s) => ({
      ...s,
      materiaId,
      codigoMateria: m ? m.codigo : '',
    }));
  };

  useEffect(() => {
    setMaterias(MOCK_MATERIAS);
    load();
  }, []);

  const onImport = async () => {
    setLoading(true);
    try {
      const r = await api.importRepos();
      toast.success(` Importados: ${r.created?.length || 0} repositorios`);
      await load();
    } catch (e) {
      toast.error(e.message || 'No se pudo importar');
    } finally {
      setLoading(false);
    }
  };

  const onInviteAll = async () => {
    setLoading(true);
    try {
      const r = await api.invitePersonalOnAll();
      toast.success(
        ` Invitaciones enviadas: ${r.invited?.length || 0} |  Fallidas: ${r.failed?.length || 0}`
      );
    } catch (e) {
      toast.error(e.message || 'No se pudo invitar');
    } finally {
      setLoading(false);
    }
  };

  const onCreateRepo = async (id) => {
    setLoading(true);
    try {
      const r = await api.createRepo(id);
      toast.success(` Repositorio creado: ${r.repo?.full_name}`);
      await load();
    } catch (e) {
      toast.error(e.message || 'No se pudo crear el repositorio');
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL copiada al portapapeles');
    } catch {
      toast.error('No se pudo copiar');
    }
  };

  const onCreateProject = async () => {
    if (!form.titulo.trim()) return toast.error('El título es obligatorio');
    if (!form.materiaId) return toast.error('Selecciona una materia');

    setLoading(true);
    try {
      await api.createProject({
        titulo: form.titulo.trim(),
        tipoGrupo: form.tipoGrupo,
        materiaId: Number(form.materiaId),
      });
      toast.success('Proyecto creado exitosamente');
      setForm({ titulo: '', tipoGrupo: 'GROUP', materiaId: '', codigoMateria: '' });
      setShowCreate(false);
      await load();
    } catch (e) {
      toast.error(e.message || 'No se pudo crear el proyecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalStyle>
      <MainContainer>
        <Card>
          <HeaderSection>
            <CardHeader title="Gestión de Proyectos" />
          </HeaderSection>

          <Toolbar>
            <ButtonGroup>
              <Btn Colors={Colors} $variant="success" onClick={onImport} disabled={loading}>
                <Download size={18} />
                Importar repositorios
              </Btn>
              <Btn Colors={Colors} $variant="primary" onClick={onInviteAll} disabled={loading}>
                <Users size={18} />
                Invitar colaboradores
              </Btn>
              <Btn Colors={Colors} $variant="neutral" onClick={load} disabled={loading}>
                <RefreshCw size={18} className={loading ? 'rotating' : ''} />
                Actualizar
              </Btn>
            </ButtonGroup>

            <Btn
              Colors={Colors}
              $variant="primary"
              onClick={() => setShowCreate(!showCreate)}
            >
              {showCreate ? (
                <>
                  <ChevronUp size={18} />
                  Cerrar
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Nuevo proyecto
                </>
              )}
            </Btn>
          </Toolbar>

          {showCreate && (
            <CreateSection>
              <CreateHeader>
                <CreateTitle>
                  Crear nuevo proyecto
                </CreateTitle>
              </CreateHeader>

              <CreateForm>
                <FormGroup>
                  <FormLabel>
                    Título del proyecto
                  </FormLabel>
                  <Input
                    Colors={Colors}
                    placeholder="Ej: Sistema de Gestión Académica"
                    value={form.titulo}
                    onChange={(e) => setForm(s => ({ ...s, titulo: e.target.value }))}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    Materia
                  </FormLabel>
                  <Select Colors={Colors} value={form.materiaId} onChange={onMateriaChange}>
                    <option value="">Seleccionar materia...</option>
                    {materias.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.codigo ? `[${m.codigo}] ` : ''}
                        {m.nombre} — {m.carrera?.nombre}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    Código de materia
                  </FormLabel>
                  <Input
                    Colors={Colors}
                    placeholder="Se completa automáticamente"
                    value={form.codigoMateria}
                    disabled
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    Tipo de proyecto
                  </FormLabel>
                  <Select
                    Colors={Colors}
                    value={form.tipoGrupo}
                    onChange={(e) => setForm(s => ({ ...s, tipoGrupo: e.target.value }))}
                  >
                    <option value="GROUP"> Grupal</option>
                    <option value="INDIVIDUAL"> Individual</option>
                  </Select>
                </FormGroup>

                <FormGroup style={{ alignSelf: 'flex-end' }}>
                  <Btn Colors={Colors} $variant="primary" onClick={onCreateProject} disabled={loading}>
                    Crear proyecto
                  </Btn>
                </FormGroup>
              </CreateForm>
            </CreateSection>
          )}

          <TableContainer>
            <TableHeader>
              <TableTitle>
                <FolderGit2 size={20} />
                Mis proyectos
              </TableTitle>
              <Badge $type="neutral">
                {items.length} {items.length === 1 ? 'proyecto' : 'proyectos'}
              </Badge>
            </TableHeader>

            <TableWrapper>
              <Table>
                <Thead>
                  <tr>
                    <Th>Proyecto</Th>
                    <Th>Código</Th>
                    <Th>Tipo</Th>
                    <Th>Mi rol</Th>
                    <Th>Repositorio</Th>
                    <Th>Acciones</Th>
                  </tr>
                </Thead>
                <Tbody>
                  {items.map((p) => (
                    <Tr key={p.id}>
                      <Td>
                        <ProjectTitle>
                          <ProjectIcon Colors={Colors}>
                            <GitBranch size={20} />
                          </ProjectIcon>
                          <ProjectInfo>
                            <ProjectName>{p.titulo}</ProjectName>
                            <ProjectMeta>ID: {p.id}</ProjectMeta>
                          </ProjectInfo>
                        </ProjectTitle>
                      </Td>
                      <Td>
                        <Badge $type="neutral">{p.codigoMateria || 'Sin código'}</Badge>
                      </Td>
                      <Td>
                        <Badge $type={p.tipoGrupo === 'GROUP' ? 'group' : 'individual'}>
                          {p.tipoGrupo === 'GROUP' ? (
                            <>
                              <Users size={12} />
                              Grupal
                            </>
                          ) : (
                            <>
                              <User size={12} />
                              Individual
                            </>
                          )}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge $type={p.rol === 'LEADER' ? 'leader' : 'neutral'}>
                          {p.rol === 'LEADER' ? (
                            <>
                              <Shield size={12} />
                              Líder
                            </>
                          ) : (
                            p.rol
                          )}
                        </Badge>
                      </Td>
                      <Td>
                        {p.repoUrl ? (
                          <RepoLink href={p.repoUrl} target="_blank" rel="noreferrer">
                            <Github size={14} />
                            Ver en GitHub
                            <ExternalLink size={12} />
                          </RepoLink>
                        ) : (
                          <Badge $type="neutral">
                            Sin repositorio
                          </Badge>
                        )}
                      </Td>
                      <Td>
                        <ActionButtons>
                          {p.repoUrl ? (
                            // SOLO COPIAR CUANDO YA TIENE REPO
                            <ActionBtn Colors={Colors} onClick={() => onCopy(p.repoUrl)}>
                              <Copy size={14} />
                              Copiar
                            </ActionBtn>
                          ) : (
                            // SIN REPO → CREAR REPO
                            <ActionBtn
                              Colors={Colors}
                              $primary
                              onClick={() => onCreateRepo(p.id)}
                              disabled={loading}
                            >
                              <GitCommit size={14} />
                              Crear repo
                            </ActionBtn>
                          )}
                        </ActionButtons>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {items.length === 0 && !loading && (
                <EmptyState>
                  <EmptyIcon>
                    <FolderGit2 size={48} />
                  </EmptyIcon>
                  <EmptyTitle>Sin proyectos todavía</EmptyTitle>
                  <EmptyText>
                    Crea tu primer proyecto para comenzar a colaborar con tu equipo
                  </EmptyText>
                  <Btn Colors={Colors} $variant="primary" onClick={() => setShowCreate(true)}>
                    <Plus size={18} />
                    Crear primer proyecto
                  </Btn>
                </EmptyState>
              )}

              {loading && (
                <LoadingOverlay>
                  <LoadingSpinner Colors={Colors} size={32} />
                </LoadingOverlay>
              )}
            </TableWrapper>
          </TableContainer>
        </Card>
      </MainContainer>
    </GlobalStyle>
  );
}

// ==== PANEL DE INTEGRACIÓN ====
const ProyectoUno = () => {
  const Colors = useColors();
  const [state, setState] = useState({
    loading: true,
    inst: false,
    personal: false,
    app: false,
    err: '',
  });

  const cargar = async () => {
    try {
      const data = await api.overview();
      const inst = (data.linkedGithub || []).some((a) => a.tipoCuenta === 'INSTITUTIONAL');
      const per = (data.linkedGithub || []).some((a) => a.tipoCuenta === 'PERSONAL');
      const app = (data.appInstallations || []).length > 0;
      setState({ loading: false, inst, personal: per, app, err: '' });
    } catch (e) {
      setState((s) => ({ ...s, loading: false, err: e.message || 'Error' }));
    }
  };

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const linkedOk = q.get('linked') === 'ok';
    const linkedErr = q.get('linked_error');
    const appOk = q.get('app_install') === 'ok';
    const appErr = q.get('app_install_error');

    if (linkedOk) toast.success(' Cuenta de GitHub enlazada correctamente');
    if (linkedErr) toast.error(decodeURIComponent(linkedErr || 'Error al enlazar'));
    if (appOk) toast.success(' GitHub App instalada y vinculada');
    if (appErr) toast.error(decodeURIComponent(appErr || 'Error al instalar App'));

    if (linkedOk || linkedErr || appOk || appErr) {
      const base = location.origin + location.pathname + location.hash;
      history.replaceState({}, '', base);
    }
    cargar();
  }, []);

  const handleRetryInvites = async () => {
    try {
      const r = await api.retryInvites();
      const ok = r?.invited?.length || 0;
      const fail = r?.failed?.length || 0;
      toast.success(` Invitaciones OK: ${ok} |  Fallidas: ${fail}`);
    } catch (e) {
      toast.error(e.message || 'No se pudieron enviar invitaciones');
    }
  };

  // Si ya está todo OK, muestra los proyectos
  if (state.inst && state.personal && state.app) {
    return <ProjectsPanel />;
  }

  // Panel de integración
  return (
    <GlobalStyle>
      <MainContainer>
        <Card>
          <HeaderSection>
            <CardHeader title="Integración con GitHub" />
          </HeaderSection>

          <StatusGrid>
            <StatusCard $ok={state.inst}>
              <StatusIcon $ok={state.inst}>
                {state.inst ? <CheckCircle2 size={24} /> : <Building size={24} />}
              </StatusIcon>
              <StatusInfo>
                <StatusLabel $ok={state.inst}>Cuenta Institucional</StatusLabel>
                <StatusValue $ok={state.inst}>
                  {state.inst ? 'Conectada' : 'No conectada'}
                </StatusValue>
              </StatusInfo>
            </StatusCard>

            <StatusCard $ok={state.personal}>
              <StatusIcon $ok={state.personal}>
                {state.personal ? <CheckCircle2 size={24} /> : <User size={24} />}
              </StatusIcon>
              <StatusInfo>
                <StatusLabel $ok={state.personal}>Cuenta Personal</StatusLabel>
                <StatusValue $ok={state.personal}>
                  {state.personal ? 'Conectada' : 'No conectada'}
                </StatusValue>
              </StatusInfo>
            </StatusCard>

            <StatusCard $ok={state.app}>
              <StatusIcon $ok={state.app}>
                {state.app ? <CheckCircle2 size={24} /> : <Zap size={24} />}
              </StatusIcon>
              <StatusInfo>
                <StatusLabel $ok={state.app}>GitHub App</StatusLabel>
                <StatusValue $ok={state.app}>
                  {state.app ? 'Instalada' : 'No instalada'}
                </StatusValue>
              </StatusInfo>
            </StatusCard>
          </StatusGrid>

          <Toolbar>
            <ButtonGroup>
              <Btn
                Colors={Colors}
                $variant={state.inst ? 'success' : 'primary'}
                onClick={() => api.linkGithub('INSTITUTIONAL')}
                disabled={state.inst}
              >
                <Building size={18} />
                {state.inst ? 'Institucional conectada' : 'Conectar institucional'}
              </Btn>

              <Btn
                Colors={Colors}
                $variant={state.personal ? 'success' : 'primary'}
                onClick={() => api.linkGithub('PERSONAL')}
                disabled={state.personal}
              >
                <User size={18} />
                {state.personal ? 'Personal conectada' : 'Conectar personal'}
              </Btn>

              <Btn
                Colors={Colors}
                $variant={state.app ? 'success' : 'primary'}
                onClick={api.installApp}
                disabled={state.app}
              >
                <Zap size={18} />
                {state.app ? 'App instalada' : 'Instalar GitHub App'}
              </Btn>
            </ButtonGroup>

            <ButtonGroup>
              <Btn Colors={Colors} $variant="neutral" onClick={cargar} disabled={state.loading}>
                <RefreshCw size={18} className={state.loading ? 'rotating' : ''} />
                Actualizar estado
              </Btn>

              {state.inst && state.personal && state.app && (
                <Btn Colors={Colors} $variant="neutral" onClick={handleRetryInvites}>
                  <Users size={18} />
                  Reintentar invitaciones
                </Btn>
              )}
            </ButtonGroup>
          </Toolbar>

          <HelpSection>
            <HelpTitle>
              <AlertCircle size={16} />
              Instrucciones de configuración
            </HelpTitle>
            <HelpText>
              Para completar la integración con GitHub, necesitas conectar tu cuenta institucional
              usando tu correo <b>@unifranz.edu.bo</b> (debe estar verificado en GitHub),
              tu cuenta personal de GitHub, y finalmente instalar la aplicación GitHub App
              para habilitar todas las funcionalidades de colaboración.
            </HelpText>
          </HelpSection>

          {state.err && (
            <HelpSection style={{ background: 'linear-gradient(135deg, #fef2f2, #fee2e2)', borderColor: '#fca5a5' }}>
              <HelpTitle style={{ color: '#991b1b' }}>
                <XCircle size={16} />
                Error de conexión
              </HelpTitle>
              <HelpText style={{ color: '#7f1d1d' }}>
                {state.err}
              </HelpText>
            </HelpSection>
          )}
        </Card>
      </MainContainer>
    </GlobalStyle>
  );
};

export default ProyectoUno;
