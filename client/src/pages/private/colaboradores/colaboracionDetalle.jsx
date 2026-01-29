// Roxy: detalle de colaboración mejorado con diseño premium

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import CardHeader from "../../../components/ui/cardHeader";
import { useColors } from "../../../style/colors";
import { 
    Users, 
    BookOpen, 
    FileText, 
    CheckCircle2, 
    Clock, 
    AlertCircle,
    TrendingUp,
    Calendar,
    MapPin,
    Award,
    Briefcase,
    ChevronRight,
    Layout,
    GraduationCap,
    Building2,
    FolderOpen
} from "lucide-react";
import { getColaboracionById } from "../../../data/colaboradoresService.jsx";

const ColaboracionDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const colors = useColors();

    const [colab, setColab] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getColaboracionById(id);
                setColab(data);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la colaboración.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Cargando colaboración...</LoadingText>
            </LoadingContainer>
        );
    }

    if (error || !colab) {
        return (
            <ErrorContainer>
                <ErrorIcon>
                    <AlertCircle size={48} />
                </ErrorIcon>
                <ErrorText>{error || "Colaboración no encontrada."}</ErrorText>
                <BackButton onClick={() => navigate(-1)}>
                    Volver al listado
                </BackButton>
            </ErrorContainer>
        );
    }

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Completo': return <CheckCircle2 size={14} />;
            case 'En progreso': return <Clock size={14} />;
            default: return <AlertCircle size={14} />;
        }
    };

    return (
        <MainContainer>
            <HeaderSection>
                <CardHeader 
                    title={colab.role} 
                    onBack={() => navigate(-1)} 
                />
                
                <ProjectHero>
                    <HeroBackground />
                    <HeroContent>
                        <ProjectImage src={colab.image} alt={colab.name} />
                        <ProjectInfo>
                            <ProjectBadge color={colors.primary}>
                                {colab.tipo}
                            </ProjectBadge>
                            <ProjectTitle>{colab.role}</ProjectTitle>
                            <ProjectSubtitle>{colab.name}</ProjectSubtitle>
                            <ProjectMeta>
                                <MetaItem>
                                    <Users size={16} />
                                    <span>{colab.participants.length} participantes</span>
                                </MetaItem>
                                <MetaItem>
                                    <Building2 size={16} />
                                    <span>{colab.faculties.length} facultades</span>
                                </MetaItem>
                                <MetaItem>
                                    <Calendar size={16} />
                                    <span>Iniciado hace 2 meses</span>
                                </MetaItem>
                            </ProjectMeta>
                        </ProjectInfo>
                    </HeroContent>
                </ProjectHero>
            </HeaderSection>

            <TabNavigation>
                <TabButton 
                    active={activeTab === 'overview'}
                    onClick={() => setActiveTab('overview')}
                    color={colors.primary}
                >
                    <Layout size={18} />
                    Vista General
                </TabButton>
                <TabButton 
                    active={activeTab === 'teams'}
                    onClick={() => setActiveTab('teams')}
                    color={colors.primary}
                >
                    <Users size={18} />
                    Equipos
                </TabButton>
                <TabButton 
                    active={activeTab === 'documents'}
                    onClick={() => setActiveTab('documents')}
                    color={colors.primary}
                >
                    <FileText size={18} />
                    Documentos
                </TabButton>
                <TabButton 
                    active={activeTab === 'boards'}
                    onClick={() => setActiveTab('boards')}
                    color={colors.primary}
                >
                    <Layout size={18} />
                    Pizarras
                </TabButton>
            </TabNavigation>

            <ContentLayout>
                {activeTab === 'overview' && (
                    <>
                        <MainColumn>
                            {/* Progress Section */}
                            <Card>
                                <CardTitle>
                                    <TrendingUp size={20} />
                                    Progreso del Proyecto
                                </CardTitle>
                                <ProgressSection>
                                    <ProgressHeader>
                                        <ProgressPercentage color={colors.primary}>
                                            {Math.round(colab.progress * 100)}%
                                        </ProgressPercentage>
                                        <ProgressLabel>Completado</ProgressLabel>
                                    </ProgressHeader>
                                    <ProgressBar>
                                        <ProgressFill 
                                            width={colab.progress * 100}
                                            color={colors.primary}
                                        />
                                    </ProgressBar>
                                    <ProgressStats>
                                        <StatItem>
                                            <StatValue>{colab.tasks.filter(t => t.status === 'Completo').length}</StatValue>
                                            <StatLabel>Completadas</StatLabel>
                                        </StatItem>
                                        <StatItem>
                                            <StatValue>{colab.tasks.filter(t => t.status === 'En progreso').length}</StatValue>
                                            <StatLabel>En progreso</StatLabel>
                                        </StatItem>
                                        <StatItem>
                                            <StatValue>{colab.tasks.filter(t => t.status === 'Pendiente').length}</StatValue>
                                            <StatLabel>Pendientes</StatLabel>
                                        </StatItem>
                                    </ProgressStats>
                                </ProgressSection>
                            </Card>

                            {/* Tasks Grid */}
                            <Card>
                                <CardTitle>
                                    <CheckCircle2 size={20} />
                                    Tareas Activas
                                </CardTitle>
                                <TasksGrid>
                                    {colab.tasks.map((task) => (
                                        <TaskCard key={task.id} status={task.status}>
                                            <TaskHeader>
                                                <TaskTitle>{task.title}</TaskTitle>
                                                <TaskStatus status={task.status}>
                                                    {getStatusIcon(task.status)}
                                                    {task.status}
                                                </TaskStatus>
                                            </TaskHeader>
                                            <TaskMeta>
                                                <TaskMetaItem>
                                                    <Clock size={12} />
                                                    Hace 2 días
                                                </TaskMetaItem>
                                                <TaskMetaItem>
                                                    <Users size={12} />
                                                    3 asignados
                                                </TaskMetaItem>
                                            </TaskMeta>
                                        </TaskCard>
                                    ))}
                                </TasksGrid>
                            </Card>

                            {/* Participants */}
                            <Card>
                                <CardTitle>
                                    <Users size={20} />
                                    Participantes Destacados
                                </CardTitle>
                                <ParticipantsGrid>
                                    {colab.participants.slice(0, 8).map((participant, index) => (
                                        <ParticipantCard key={index}>
                                            <ParticipantImage src={participant} alt="Participant" />
                                            <ParticipantInfo>
                                                <ParticipantName>Estudiante {index + 1}</ParticipantName>
                                                <ParticipantRole>Colaborador</ParticipantRole>
                                            </ParticipantInfo>
                                        </ParticipantCard>
                                    ))}
                                </ParticipantsGrid>
                            </Card>
                        </MainColumn>

                        <SideColumn>
                            {/* Quick Stats */}
                            <StatsCard>
                                <StatsGrid>
                                    <StatCard color="#10B981">
                                        <StatIcon>
                                            <Award size={24} />
                                        </StatIcon>
                                        <StatInfo>
                                            <StatNumber>4.8</StatNumber>
                                            <StatDesc>Calificación</StatDesc>
                                        </StatInfo>
                                    </StatCard>
                                    <StatCard color="#3B82F6">
                                        <StatIcon>
                                            <Briefcase size={24} />
                                        </StatIcon>
                                        <StatInfo>
                                            <StatNumber>{colab.tasks.length}</StatNumber>
                                            <StatDesc>Tareas</StatDesc>
                                        </StatInfo>
                                    </StatCard>
                                    <StatCard color="#F59E0B">
                                        <StatIcon>
                                            <FileText size={24} />
                                        </StatIcon>
                                        <StatInfo>
                                            <StatNumber>{colab.documents.length}</StatNumber>
                                            <StatDesc>Documentos</StatDesc>
                                        </StatInfo>
                                    </StatCard>
                                    <StatCard color="#EF4444">
                                        <StatIcon>
                                            <Calendar size={24} />
                                        </StatIcon>
                                        <StatInfo>
                                            <StatNumber>15</StatNumber>
                                            <StatDesc>Días restantes</StatDesc>
                                        </StatInfo>
                                    </StatCard>
                                </StatsGrid>
                            </StatsCard>

                            {/* Careers */}
                            <Card>
                                <CardTitle>
                                    <GraduationCap size={20} />
                                    Carreras Involucradas
                                </CardTitle>
                                <CareersList>
                                    {colab.careers.map((career, index) => (
                                        <CareerItem key={index}>
                                            <CareerDot color={colors.primary} />
                                            <CareerName>{career}</CareerName>
                                            <ChevronRight size={14} />
                                        </CareerItem>
                                    ))}
                                </CareersList>
                            </Card>

                            {/* Recent Activity */}
                            <Card>
                                <CardTitle>
                                    <Clock size={20} />
                                    Actividad Reciente
                                </CardTitle>
                                <ActivityList>
                                    <ActivityItem>
                                        <ActivityIcon color="#10B981">
                                            <CheckCircle2 size={16} />
                                        </ActivityIcon>
                                        <ActivityContent>
                                            <ActivityTitle>Tarea completada</ActivityTitle>
                                            <ActivityTime>Hace 2 horas</ActivityTime>
                                        </ActivityContent>
                                    </ActivityItem>
                                    <ActivityItem>
                                        <ActivityIcon color="#3B82F6">
                                            <FileText size={16} />
                                        </ActivityIcon>
                                        <ActivityContent>
                                            <ActivityTitle>Documento subido</ActivityTitle>
                                            <ActivityTime>Hace 5 horas</ActivityTime>
                                        </ActivityContent>
                                    </ActivityItem>
                                    <ActivityItem>
                                        <ActivityIcon color="#F59E0B">
                                            <Users size={16} />
                                        </ActivityIcon>
                                        <ActivityContent>
                                            <ActivityTitle>Nuevo miembro añadido</ActivityTitle>
                                            <ActivityTime>Hace 1 día</ActivityTime>
                                        </ActivityContent>
                                    </ActivityItem>
                                </ActivityList>
                            </Card>
                        </SideColumn>
                    </>
                )}

                {activeTab === 'teams' && (
                    <TeamsSection>
                        {colab.faculties.map((faculty) => (
                            <FacultyCard key={faculty.id}>
                                <FacultyHeader>
                                    <FacultyIcon>
                                        <Building2 size={24} />
                                    </FacultyIcon>
                                    <FacultyInfo>
                                        <FacultyName>{faculty.name}</FacultyName>
                                        <FacultyStats>
                                            {faculty.students.length} estudiantes · {faculty.careers.length} carreras
                                        </FacultyStats>
                                    </FacultyInfo>
                                </FacultyHeader>
                                <FacultyContent>
                                    <SectionLabel>Carreras participantes</SectionLabel>
                                    <CareerTags>
                                        {faculty.careers.map((career, i) => (
                                            <CareerTag key={i} color={colors.primary}>
                                                {career}
                                            </CareerTag>
                                        ))}
                                    </CareerTags>
                                    <SectionLabel>Estudiantes</SectionLabel>
                                    <StudentsList>
                                        {faculty.students.map((student) => (
                                            <StudentItem key={student.id}>
                                                <StudentAvatar>
                                                    {student.name.charAt(0)}
                                                </StudentAvatar>
                                                <StudentInfo>
                                                    <StudentName>{student.name}</StudentName>
                                                    <StudentCareer>{student.career}</StudentCareer>
                                                </StudentInfo>
                                            </StudentItem>
                                        ))}
                                    </StudentsList>
                                </FacultyContent>
                            </FacultyCard>
                        ))}
                    </TeamsSection>
                )}

                {activeTab === 'documents' && (
                    <DocumentsGrid>
                        {colab.documents.map((doc) => (
                            <DocumentCard key={doc.id}>
                                <DocumentIcon>
                                    <FolderOpen size={32} />
                                </DocumentIcon>
                                <DocumentContent>
                                    <DocumentTitle>{doc.title}</DocumentTitle>
                                    <DocumentType>{doc.type}</DocumentType>
                                    <DocumentFooter>
                                        <DocumentStatus status={doc.status}>
                                            {getStatusIcon(doc.status)}
                                            {doc.status}
                                        </DocumentStatus>
                                        {doc.url && (
                                            <ViewButton 
                                                href={doc.url} 
                                                target="_blank"
                                                color={colors.primary}
                                            >
                                                Ver documento
                                                <ChevronRight size={14} />
                                            </ViewButton>
                                        )}
                                    </DocumentFooter>
                                </DocumentContent>
                            </DocumentCard>
                        ))}
                    </DocumentsGrid>
                )}

                {activeTab === 'boards' && (
                    <BoardsGrid>
                        {colab.boards.map((board) => (
                            <BoardCard key={board.id}>
                                <BoardHeader color={colors.primary}>
                                    <Layout size={20} />
                                    Pizarra
                                </BoardHeader>
                                <BoardContent>
                                    <BoardTitle>{board.title}</BoardTitle>
                                    <BoardMeta>
                                        <BoardMetaItem>
                                            <strong>ID:</strong> {board.id}
                                        </BoardMetaItem>
                                        <BoardMetaItem>
                                            <strong>Tipo:</strong> {board.type}
                                        </BoardMetaItem>
                                        <BoardMetaItem>
                                            <Clock size={12} />
                                            {board.lastUpdate}
                                        </BoardMetaItem>
                                    </BoardMeta>
                                    <AccessButton color={colors.primary}>
                                        Acceder a pizarra
                                        <ChevronRight size={16} />
                                    </AccessButton>
                                </BoardContent>
                            </BoardCard>
                        ))}
                    </BoardsGrid>
                )}
            </ContentLayout>
        </MainContainer>
    );
};

export default ColaboracionDetalle;

/* ---------- ANIMACIONES ---------- */

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
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
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

/* ---------- CONTENEDORES PRINCIPALES ---------- */

const MainContainer = styled.div`
    min-height: 100vh;
    background: #f8f9fa;
    animation: ${fadeIn} 0.3s ease;
`;

const HeaderSection = styled.div`
    background: white;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 24px;
`;

const LoadingSpinner = styled.div`
    width: 48px;
    height: 48px;
    border: 3px solid #e5e7eb;
    border-top-color: ${props => props.theme?.primary || '#ff6b35'};
    border-radius: 50%;
    animation: ${rotate} 0.8s linear infinite;
`;

const LoadingText = styled.p`
    font-size: 16px;
    color: #6b7280;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 24px;
`;

const ErrorIcon = styled.div`
    color: #ef4444;
`;

const ErrorText = styled.p`
    font-size: 18px;
    color: #374151;
`;

const BackButton = styled.button`
    padding: 12px 24px;
    background: #111827;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

/* ---------- HERO SECTION ---------- */

const ProjectHero = styled.div`
    position: relative;
    padding: 32px;
    overflow: hidden;
`;

const HeroBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0.05;
`;

const HeroContent = styled.div`
    position: relative;
    display: flex;
    gap: 32px;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

const ProjectImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 24px;
    object-fit: cover;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const ProjectInfo = styled.div`
    flex: 1;
`;

const ProjectBadge = styled.span`
    display: inline-block;
    padding: 6px 16px;
    background: ${props => props.color}22;
    color: ${props => props.color};
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 12px;
`;

const ProjectTitle = styled.h1`
    margin: 0 0 8px 0;
    font-size: 32px;
    font-weight: 700;
    color: #111827;
`;

const ProjectSubtitle = styled.p`
    margin: 0 0 20px 0;
    font-size: 18px;
    color: #6b7280;
`;

const ProjectMeta = styled.div`
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    font-size: 14px;
    
    svg {
        color: #9ca3af;
    }
`;

/* ---------- TABS ---------- */

const TabNavigation = styled.div`
    display: flex;
    gap: 8px;
    padding: 0 32px;
    background: white;
    border-bottom: 1px solid #e5e7eb;
    overflow-x: auto;
    
    &::-webkit-scrollbar {
        height: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 999px;
    }
`;

const TabButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 24px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: ${props => props.active ? props.color : '#6b7280'};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    
    ${props => props.active && `
        border-bottom-color: ${props.color};
        background: linear-gradient(to bottom, transparent, ${props.color}08);
    `}
    
    &:hover {
        color: ${props => props.color};
        background: ${props => props.color}08;
    }
`;

/* ---------- LAYOUT ---------- */

const ContentLayout = styled.div`
    display: flex;
    gap: 24px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px;
    animation: ${fadeIn} 0.4s ease;
    
    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

const MainColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SideColumn = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    
    @media (max-width: 1024px) {
        width: 100%;
    }
`;

/* ---------- CARDS ---------- */

const Card = styled.div`
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    animation: ${slideIn} 0.3s ease;
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
    }
`;

const CardTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
`;

const StatsCard = styled(Card)`
    padding: 0;
    overflow: hidden;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
`;

const StatCard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: ${props => props.color}08;
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.color}15;
        
        svg {
            transform: scale(1.1);
        }
    }
`;

const StatIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: white;
    border-radius: 12px;
    
    svg {
        transition: transform 0.2s ease;
    }
`;

const StatInfo = styled.div``;

const StatNumber = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #111827;
`;

const StatDesc = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

/* ---------- PROGRESS ---------- */

const ProgressSection = styled.div``;

const ProgressHeader = styled.div`
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 16px;
`;

const ProgressPercentage = styled.div`
    font-size: 36px;
    font-weight: 700;
    color: ${props => props.color};
`;

const ProgressLabel = styled.div`
    font-size: 14px;
    color: #6b7280;
`;

const ProgressBar = styled.div`
    height: 12px;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 24px;
`;

const ProgressFill = styled.div`
    height: 100%;
    width: ${props => props.width}%;
    background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}dd);
    border-radius: 999px;
    transition: width 1s ease;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;

const ProgressStats = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background: #f9fafb;
    border-radius: 16px;
`;

const StatItem = styled.div`
    text-align: center;
`;

const StatValue = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 4px;
`;

const StatLabel = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

/* ---------- TASKS ---------- */

const TasksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
`;

const TaskCard = styled.div`
    padding: 16px;
    background: ${props => {
        if (props.status === 'Completo') return '#f0fdf4';
        if (props.status === 'En progreso') return '#fefce8';
        return '#fef2f2';
    }};
    border-radius: 16px;
    border: 1px solid ${props => {
        if (props.status === 'Completo') return '#bbf7d0';
        if (props.status === 'En progreso') return '#fef08a';
        return '#fecaca';
    }};
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
`;

const TaskHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
`;

const TaskTitle = styled.h3`
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #111827;
`;

const TaskStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 500;
    background: ${props => {
        if (props.status === 'Completo') return '#10b981';
        if (props.status === 'En progreso') return '#f59e0b';
        return '#ef4444';
    }};
    color: white;
`;

const TaskMeta = styled.div`
    display: flex;
    gap: 16px;
`;

const TaskMetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #6b7280;
`;

/* ---------- PARTICIPANTS ---------- */

const ParticipantsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
`;

const ParticipantCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    background: #f9fafb;
    border-radius: 16px;
    transition: all 0.2s ease;
    
    &:hover {
        background: #f3f4f6;
        transform: translateY(-2px);
        
        img {
            transform: scale(1.1);
        }
    }
`;

const ParticipantImage = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 12px;
    transition: transform 0.2s ease;
`;

const ParticipantInfo = styled.div`
    text-align: center;
`;

const ParticipantName = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 2px;
`;

const ParticipantRole = styled.div`
    font-size: 11px;
    color: #6b7280;
`;

/* ---------- CAREERS ---------- */

const CareersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const CareerItem = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    background: #f9fafb;
    border-radius: 12px;
    transition: all 0.2s ease;
    cursor: pointer;
    
    &:hover {
        background: #f3f4f6;
        transform: translateX(4px);
        
        svg {
            transform: translateX(4px);
        }
    }
    
    svg {
        margin-left: auto;
        color: #9ca3af;
        transition: transform 0.2s ease;
    }
`;

const CareerDot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.color};
    margin-right: 12px;
`;

const CareerName = styled.div`
    font-size: 14px;
    color: #374151;
`;

/* ---------- ACTIVITY ---------- */

const ActivityList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ActivityItem = styled.div`
    display: flex;
    gap: 12px;
`;

const ActivityIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: ${props => props.color}15;
    border-radius: 10px;
    flex-shrink: 0;
    
    svg {
        color: ${props => props.color};
    }
`;

const ActivityContent = styled.div`
    flex: 1;
`;

const ActivityTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin-bottom: 2px;
`;

const ActivityTime = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

/* ---------- TEAMS SECTION ---------- */

const TeamsSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 24px;
    width: 100%;
`;

const FacultyCard = styled(Card)``;

const FacultyHeader = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
`;

const FacultyIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 16px;
    
    svg {
        color: white;
    }
`;

const FacultyInfo = styled.div``;

const FacultyName = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 4px;
`;

const FacultyStats = styled.div`
    font-size: 14px;
    color: #6b7280;
`;

const FacultyContent = styled.div``;

const SectionLabel = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 20px 0 12px 0;
    
    &:first-child {
        margin-top: 0;
    }
`;

const CareerTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const CareerTag = styled.span`
    padding: 6px 12px;
    background: ${props => props.color}15;
    color: ${props => props.color};
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
`;

const StudentsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const StudentItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 12px;
    transition: all 0.2s ease;
    
    &:hover {
        background: #f3f4f6;
        transform: translateX(4px);
    }
`;

const StudentAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-radius: 50%;
    font-weight: 600;
    font-size: 14px;
`;

const StudentInfo = styled.div``;

const StudentName = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #111827;
`;

const StudentCareer = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

/* ---------- DOCUMENTS ---------- */

const DocumentsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    width: 100%;
`;

const DocumentCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const DocumentIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
    border-radius: 20px;
    margin-bottom: 16px;
    
    svg {
        color: #6b7280;
    }
`;

const DocumentContent = styled.div`
    width: 100%;
`;

const DocumentTitle = styled.h3`
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
`;

const DocumentType = styled.div`
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 16px;
`;

const DocumentFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;
`;

const DocumentStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    background: ${props => {
        if (props.status === 'Completo') return '#dcfce7';
        if (props.status === 'En progreso') return '#fef9c3';
        return '#fee2e2';
    }};
    color: ${props => {
        if (props.status === 'Completo') return '#166534';
        if (props.status === 'En progreso') return '#854d0e';
        return '#991b1b';
    }};
`;

const ViewButton = styled.a`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: ${props => props.color};
    color: white;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${props => props.color}40;
        
        svg {
            transform: translateX(2px);
        }
    }
    
    svg {
        transition: transform 0.2s ease;
    }
`;

/* ---------- BOARDS ---------- */

const BoardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    width: 100%;
`;

const BoardCard = styled(Card)``;

const BoardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    margin: -24px -24px 20px -24px;
    background: ${props => props.color}08;
    border-bottom: 2px solid ${props => props.color}20;
    
    svg {
        color: ${props => props.color};
    }
`;

const BoardContent = styled.div``;

const BoardTitle = styled.h3`
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
`;

const BoardMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
`;

const BoardMetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #6b7280;
    
    strong {
        color: #374151;
    }
`;

const AccessButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    background: ${props => props.color};
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px ${props => props.color}30;
        
        svg {
            animation: ${pulse} 0.5s ease;
        }
    }
`;