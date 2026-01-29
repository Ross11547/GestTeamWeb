// Roxy: detalle de materia mejorado con diseño premium

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import CardHeader from "../../../components/ui/cardHeader";
import { useColors } from "../../../style/colors";
import { 
    BookOpen, 
    Calendar, 
    Clock, 
    MapPin, 
    User,
    FolderOpen,
    FileText,
    CheckCircle2,
    AlertCircle,
    XCircle,
    TrendingUp,
    Layout,
    ExternalLink,
    Award,
    Target,
    GitBranch,
    Activity,
    BarChart3,
    ChevronRight,
    Download,
    Upload,
    Star,
    Briefcase,
    ClipboardCheck,
    Zap,
    Grid3x3
} from "lucide-react";
import { getMateriaById } from "../../../data/materiaDetalle.jsx";

const MateriaDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const colors = useColors();

    const [materia, setMateria] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState('proyectos');
    const [expandedProject, setExpandedProject] = useState(null);

    useEffect(() => {
        const fetchMateria = async () => {
            try {
                const data = await getMateriaById(id);
                setMateria(data);
                if (data?.projects && data.projects.length > 0) {
                    setSelectedProject(data.projects[0]);
                }
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la información de la materia.");
            } finally {
                setLoading(false);
            }
        };

        fetchMateria();
    }, [id]);

    if (loading) {
        return (
            <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Cargando información de la materia...</LoadingText>
            </LoadingContainer>
        );
    }

    if (error || !materia) {
        return (
            <ErrorContainer>
                <ErrorIcon>
                    <AlertCircle size={48} />
                </ErrorIcon>
                <ErrorTitle>Error al cargar la materia</ErrorTitle>
                <ErrorText>{error || "Materia no encontrada."}</ErrorText>
                <BackButton onClick={() => navigate(-1)} color={colors.primary}>
                    Volver al listado
                </BackButton>
            </ErrorContainer>
        );
    }

    const getStatusIcon = (status) => {
        switch(status?.toLowerCase()) {
            case 'completo':
            case 'entregado':
                return <CheckCircle2 size={16} />;
            case 'en progreso':
            case 'pendiente':
                return <Clock size={16} />;
            case 'retrasado':
            case 'no entregado':
                return <XCircle size={16} />;
            default:
                return <AlertCircle size={16} />;
        }
    };

    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'completo':
            case 'entregado':
                return '#10B981';
            case 'en progreso':
            case 'pendiente':
                return '#F59E0B';
            case 'retrasado':
            case 'no entregado':
                return '#EF4444';
            default:
                return '#6B7280';
        }
    };

    const getGradeColor = (grade) => {
        if (grade >= 90) return '#10B981';
        if (grade >= 70) return '#3B82F6';
        if (grade >= 51) return '#F59E0B';
        return '#EF4444';
    };

    return (
        <MainContainer>
            <HeaderSection>
                <CardHeader 
                    title={materia.name} 
                    onBack={() => navigate(-1)} 
                />
                
                <SubjectHero>
                    <HeroBackground />
                    <HeroPattern />
                    <HeroContent>
                        <SubjectImageWrapper>
                            <SubjectImage src={materia.image} alt={materia.name} />
                            <SubjectBadge color={colors.primary}>
                                <BookOpen size={20} />
                            </SubjectBadge>
                        </SubjectImageWrapper>
                        
                        <SubjectInfo>
                            <SubjectCode>MAT-{id}</SubjectCode>
                            <SubjectName>{materia.name}</SubjectName>
                            <SubjectMeta>
                                <MetaItem>
                                    <User size={16} />
                                    <span>Prof. {materia.teacher}</span>
                                </MetaItem>
                                <MetaItem>
                                    <Clock size={16} />
                                    <span>{materia.schedule}</span>
                                </MetaItem>
                                <MetaItem>
                                    <MapPin size={16} />
                                    <span>{materia.classroom}</span>
                                </MetaItem>
                                <MetaItem>
                                    <Calendar size={16} />
                                    <span>Semestre 2024-2</span>
                                </MetaItem>
                            </SubjectMeta>
                            
                            <QuickStats>
                                <QuickStatCard color="#10B981">
                                    <QuickStatIcon>
                                        <FolderOpen size={20} />
                                    </QuickStatIcon>
                                    <QuickStatInfo>
                                        <QuickStatValue>{materia.projects?.length || 0}</QuickStatValue>
                                        <QuickStatLabel>Proyectos</QuickStatLabel>
                                    </QuickStatInfo>
                                </QuickStatCard>
                                
                                <QuickStatCard color="#3B82F6">
                                    <QuickStatIcon>
                                        <FileText size={20} />
                                    </QuickStatIcon>
                                    <QuickStatInfo>
                                        <QuickStatValue>{materia.deliveries?.length || 0}</QuickStatValue>
                                        <QuickStatLabel>Entregas</QuickStatLabel>
                                    </QuickStatInfo>
                                </QuickStatCard>
                                
                                <QuickStatCard color="#F59E0B">
                                    <QuickStatIcon>
                                        <Layout size={20} />
                                    </QuickStatIcon>
                                    <QuickStatInfo>
                                        <QuickStatValue>{materia.boards?.length || 0}</QuickStatValue>
                                        <QuickStatLabel>Pizarras</QuickStatLabel>
                                    </QuickStatInfo>
                                </QuickStatCard>
                                
                                <QuickStatCard color="#8B5CF6">
                                    <QuickStatIcon>
                                        <Award size={20} />
                                    </QuickStatIcon>
                                    <QuickStatInfo>
                                        <QuickStatValue>85</QuickStatValue>
                                        <QuickStatLabel>Promedio</QuickStatLabel>
                                    </QuickStatInfo>
                                </QuickStatCard>
                            </QuickStats>
                        </SubjectInfo>
                    </HeroContent>
                </SubjectHero>
            </HeaderSection>

            <TabsContainer>
                <TabButton 
                    active={activeTab === 'proyectos'}
                    onClick={() => setActiveTab('proyectos')}
                    color={colors.primary}
                >
                    <FolderOpen size={18} />
                    Proyectos
                    {materia.projects?.length > 0 && (
                        <TabBadge>{materia.projects.length}</TabBadge>
                    )}
                </TabButton>
                
                <TabButton 
                    active={activeTab === 'entregas'}
                    onClick={() => setActiveTab('entregas')}
                    color={colors.primary}
                >
                    <FileText size={18} />
                    Entregas
                    {materia.deliveries?.length > 0 && (
                        <TabBadge>{materia.deliveries.length}</TabBadge>
                    )}
                </TabButton>
                
                <TabButton 
                    active={activeTab === 'pizarras'}
                    onClick={() => setActiveTab('pizarras')}
                    color={colors.primary}
                >
                    <Layout size={18} />
                    Pizarras
                    {materia.boards?.length > 0 && (
                        <TabBadge>{materia.boards.length}</TabBadge>
                    )}
                </TabButton>
                
                <TabButton 
                    active={activeTab === 'estadisticas'}
                    onClick={() => setActiveTab('estadisticas')}
                    color={colors.primary}
                >
                    <BarChart3 size={18} />
                    Estadísticas
                </TabButton>
            </TabsContainer>

            <ContentContainer>
                {activeTab === 'proyectos' && (
                    <ProjectsSection>
                        {selectedProject && (
                            <SelectedProjectCard>
                                <ProjectCardHeader color={colors.primary}>
                                    <ProjectIcon>
                                        <Briefcase size={24} />
                                    </ProjectIcon>
                                    <ProjectHeaderInfo>
                                        <ProjectBadge>Proyecto Seleccionado</ProjectBadge>
                                        <ProjectTitle>{selectedProject.title}</ProjectTitle>
                                        <ProjectCode>Código: {selectedProject.id}</ProjectCode>
                                    </ProjectHeaderInfo>
                                </ProjectCardHeader>
                                
                                <ProjectCardBody>
                                    <ProjectDescription>
                                        {selectedProject.description}
                                    </ProjectDescription>
                                    
                                    <ProjectProgressSection>
                                        <ProgressHeader>
                                            <ProgressTitle>
                                                <TrendingUp size={18} />
                                                Progreso del Proyecto
                                            </ProgressTitle>
                                            <ProgressPercentage color={colors.primary}>
                                                {Math.round((selectedProject.progress || 0) * 100)}%
                                            </ProgressPercentage>
                                        </ProgressHeader>
                                        <ProgressBar>
                                            <ProgressFill 
                                                width={(selectedProject.progress || 0) * 100}
                                                color={colors.primary}
                                            />
                                        </ProgressBar>
                                        <ProgressMeta>
                                            <ProgressDate>
                                                <Calendar size={14} />
                                                Inicio: {selectedProject.startDate}
                                            </ProgressDate>
                                            <ProgressDate>
                                                <Clock size={14} />
                                                Fin: {selectedProject.endDate}
                                            </ProgressDate>
                                        </ProgressMeta>
                                    </ProjectProgressSection>
                                    
                                    <ProjectStats>
                                        <ProjectStatItem>
                                            <ProjectStatIcon color={getStatusColor(selectedProject.status)}>
                                                {getStatusIcon(selectedProject.status)}
                                            </ProjectStatIcon>
                                            <ProjectStatLabel>Estado</ProjectStatLabel>
                                            <ProjectStatValue>{selectedProject.status}</ProjectStatValue>
                                        </ProjectStatItem>
                                        
                                        <ProjectStatItem>
                                            <ProjectStatIcon color="#8B5CF6">
                                                <GitBranch size={20} />
                                            </ProjectStatIcon>
                                            <ProjectStatLabel>Tareas</ProjectStatLabel>
                                            <ProjectStatValue>12</ProjectStatValue>
                                        </ProjectStatItem>
                                        
                                        <ProjectStatItem>
                                            <ProjectStatIcon color="#10B981">
                                                <CheckCircle2 size={20} />
                                            </ProjectStatIcon>
                                            <ProjectStatLabel>Completadas</ProjectStatLabel>
                                            <ProjectStatValue>8</ProjectStatValue>
                                        </ProjectStatItem>
                                        
                                        <ProjectStatItem>
                                            <ProjectStatIcon color="#F59E0B">
                                                <Activity size={20} />
                                            </ProjectStatIcon>
                                            <ProjectStatLabel>Actividad</ProjectStatLabel>
                                            <ProjectStatValue>Alta</ProjectStatValue>
                                        </ProjectStatItem>
                                    </ProjectStats>
                                </ProjectCardBody>
                            </SelectedProjectCard>
                        )}
                        
                        <ProjectsGrid>
                            {materia.projects?.map((project) => (
                                <ProjectCard 
                                    key={project.id}
                                    selected={selectedProject?.id === project.id}
                                    onClick={() => {
                                        setSelectedProject(project);
                                        setExpandedProject(
                                            expandedProject === project.id ? null : project.id
                                        );
                                    }}
                                >
                                    <ProjectCardTop>
                                        <ProjectCardIcon color={colors.primary}>
                                            <Target size={20} />
                                        </ProjectCardIcon>
                                        <ProjectCardStatus color={getStatusColor(project.status)}>
                                            {getStatusIcon(project.status)}
                                            {project.status}
                                        </ProjectCardStatus>
                                    </ProjectCardTop>
                                    
                                    <ProjectCardTitle>{project.title}</ProjectCardTitle>
                                    <ProjectCardCode>{project.id}</ProjectCardCode>
                                    
                                    <ProjectCardProgress>
                                        <MiniProgressBar>
                                            <MiniProgressFill 
                                                width={(project.progress || 0) * 100}
                                                color={colors.primary}
                                            />
                                        </MiniProgressBar>
                                        <ProgressText>
                                            {Math.round((project.progress || 0) * 100)}% completado
                                        </ProgressText>
                                    </ProjectCardProgress>
                                    
                                    <ProjectCardDates>
                                        <DateItem>
                                            <Calendar size={12} />
                                            {project.startDate}
                                        </DateItem>
                                        <DateItem>
                                            <Clock size={12} />
                                            {project.endDate}
                                        </DateItem>
                                    </ProjectCardDates>
                                    
                                    {expandedProject === project.id && (
                                        <ProjectCardExpanded>
                                            <ExpandedDescription>
                                                {project.description}
                                            </ExpandedDescription>
                                            <ViewProjectButton color={colors.primary}>
                                                Ver detalles completos
                                                <ChevronRight size={16} />
                                            </ViewProjectButton>
                                        </ProjectCardExpanded>
                                    )}
                                </ProjectCard>
                            ))}
                            
                            {(!materia.projects || materia.projects.length === 0) && (
                                <EmptyState>
                                    <EmptyIcon>
                                        <FolderOpen size={48} />
                                    </EmptyIcon>
                                    <EmptyTitle>Sin proyectos registrados</EmptyTitle>
                                    <EmptyText>
                                        Aún no hay proyectos asignados para esta materia.
                                    </EmptyText>
                                </EmptyState>
                            )}
                        </ProjectsGrid>
                    </ProjectsSection>
                )}

                {activeTab === 'entregas' && (
                    <DeliveriesSection>
                        <DeliveriesHeader>
                            <SectionTitle>
                                <FileText size={24} />
                                Entregas y Tareas
                            </SectionTitle>
                            <FilterButtons>
                                <FilterButton active color={colors.primary}>
                                    Todas
                                </FilterButton>
                                <FilterButton color={colors.primary}>
                                    Pendientes
                                </FilterButton>
                                <FilterButton color={colors.primary}>
                                    Entregadas
                                </FilterButton>
                            </FilterButtons>
                        </DeliveriesHeader>
                        
                        <DeliveriesGrid>
                            {materia.deliveries?.map((delivery) => (
                                <DeliveryCard key={delivery.id}>
                                    <DeliveryHeader>
                                        <DeliveryIcon color={getStatusColor(delivery.status)}>
                                            <ClipboardCheck size={24} />
                                        </DeliveryIcon>
                                        <DeliveryHeaderInfo>
                                            <DeliveryTitle>{delivery.title}</DeliveryTitle>
                                            <DeliveryCode>ID: {delivery.id}</DeliveryCode>
                                        </DeliveryHeaderInfo>
                                    </DeliveryHeader>
                                    
                                    <DeliveryBody>
                                        <DeliveryMetaRow>
                                            <DeliveryMeta>
                                                <MetaIcon>
                                                    <Calendar size={14} />
                                                </MetaIcon>
                                                <MetaText>Fecha límite: {delivery.dueDate}</MetaText>
                                            </DeliveryMeta>
                                            
                                            <DeliveryStatus color={getStatusColor(delivery.status)}>
                                                {getStatusIcon(delivery.status)}
                                                {delivery.status}
                                            </DeliveryStatus>
                                        </DeliveryMetaRow>
                                        
                                        {delivery.grade !== null && delivery.grade !== undefined && (
                                            <GradeSection>
                                                <GradeLabel>Calificación</GradeLabel>
                                                <GradeValue color={getGradeColor(delivery.grade)}>
                                                    <Star size={16} />
                                                    {delivery.grade}/100
                                                </GradeValue>
                                            </GradeSection>
                                        )}
                                        
                                        <DeliveryActions>
                                            {delivery.status === 'Pendiente' && (
                                                <ActionButton primary color={colors.primary}>
                                                    <Upload size={16} />
                                                    Subir entrega
                                                </ActionButton>
                                            )}
                                            {delivery.status === 'Entregado' && (
                                                <ActionButton color={colors.primary}>
                                                    <Download size={16} />
                                                    Ver entrega
                                                </ActionButton>
                                            )}
                                        </DeliveryActions>
                                    </DeliveryBody>
                                </DeliveryCard>
                            ))}
                            
                            {(!materia.deliveries || materia.deliveries.length === 0) && (
                                <EmptyState>
                                    <EmptyIcon>
                                        <FileText size={48} />
                                    </EmptyIcon>
                                    <EmptyTitle>Sin entregas registradas</EmptyTitle>
                                    <EmptyText>
                                        No hay entregas programadas para esta materia.
                                    </EmptyText>
                                </EmptyState>
                            )}
                        </DeliveriesGrid>
                    </DeliveriesSection>
                )}

                {activeTab === 'pizarras' && (
                    <BoardsSection>
                        <BoardsHeader>
                            <SectionTitle>
                                <Layout size={24} />
                                Pizarras Colaborativas
                            </SectionTitle>
                            <CreateBoardButton color={colors.primary}>
                                <Zap size={16} />
                                Nueva Pizarra
                            </CreateBoardButton>
                        </BoardsHeader>
                        
                        <BoardsGrid>
                            {materia.boards?.map((board) => (
                                <BoardCard key={board.id}>
                                    <BoardCardHeader>
                                        <BoardIcon color={colors.primary}>
                                            <Grid3x3 size={32} />
                                        </BoardIcon>
                                        <BoardBadge>{board.tool}</BoardBadge>
                                    </BoardCardHeader>
                                    
                                    <BoardCardBody>
                                        <BoardTitle>{board.title}</BoardTitle>
                                        <BoardCode>ID: {board.id}</BoardCode>
                                        
                                        <BoardMeta>
                                            <BoardMetaItem>
                                                <Clock size={14} />
                                                Actualizado: {board.lastUpdate}
                                            </BoardMetaItem>
                                            <BoardMetaItem>
                                                <User size={14} />
                                                5 colaboradores
                                            </BoardMetaItem>
                                        </BoardMeta>
                                        
                                        <BoardActions>
                                            <BoardButton 
                                                primary 
                                                href={board.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                color={colors.primary}
                                            >
                                                <ExternalLink size={16} />
                                                Abrir Pizarra
                                            </BoardButton>
                                            <BoardButton color={colors.primary}>
                                                <Activity size={16} />
                                                Ver Actividad
                                            </BoardButton>
                                        </BoardActions>
                                    </BoardCardBody>
                                </BoardCard>
                            ))}
                            
                            {(!materia.boards || materia.boards.length === 0) && (
                                <EmptyState>
                                    <EmptyIcon>
                                        <Layout size={48} />
                                    </EmptyIcon>
                                    <EmptyTitle>Sin pizarras asociadas</EmptyTitle>
                                    <EmptyText>
                                        No hay pizarras colaborativas creadas para esta materia.
                                    </EmptyText>
                                </EmptyState>
                            )}
                        </BoardsGrid>
                    </BoardsSection>
                )}

                {activeTab === 'estadisticas' && (
                    <StatsSection>
                        <StatsGrid>
                            <BigStatCard>
                                <BigStatHeader color="#10B981">
                                    <TrendingUp size={32} />
                                    <BigStatTitle>Rendimiento General</BigStatTitle>
                                </BigStatHeader>
                                <BigStatValue>85%</BigStatValue>
                                <BigStatLabel>Promedio de calificaciones</BigStatLabel>
                                <StatChart>
                                    {/* Aquí iría un gráfico real */}
                                    <ChartPlaceholder>
                                        📊 Gráfico de rendimiento
                                    </ChartPlaceholder>
                                </StatChart>
                            </BigStatCard>
                            
                            <SmallStatsGrid>
                                <SmallStatCard color="#3B82F6">
                                    <SmallStatIcon>
                                        <CheckCircle2 size={24} />
                                    </SmallStatIcon>
                                    <SmallStatInfo>
                                        <SmallStatValue>8/10</SmallStatValue>
                                        <SmallStatLabel>Tareas completadas</SmallStatLabel>
                                    </SmallStatInfo>
                                </SmallStatCard>
                                
                                <SmallStatCard color="#F59E0B">
                                    <SmallStatIcon>
                                        <Clock size={24} />
                                    </SmallStatIcon>
                                    <SmallStatInfo>
                                        <SmallStatValue>2</SmallStatValue>
                                        <SmallStatLabel>Entregas pendientes</SmallStatLabel>
                                    </SmallStatInfo>
                                </SmallStatCard>
                                
                                <SmallStatCard color="#8B5CF6">
                                    <SmallStatIcon>
                                        <Award size={24} />
                                    </SmallStatIcon>
                                    <SmallStatInfo>
                                        <SmallStatValue>78</SmallStatValue>
                                        <SmallStatLabel>Calificación actual</SmallStatLabel>
                                    </SmallStatInfo>
                                </SmallStatCard>
                                
                                <SmallStatCard color="#EC4899">
                                    <SmallStatIcon>
                                        <Activity size={24} />
                                    </SmallStatIcon>
                                    <SmallStatInfo>
                                        <SmallStatValue>Alta</SmallStatValue>
                                        <SmallStatLabel>Participación</SmallStatLabel>
                                    </SmallStatInfo>
                                </SmallStatCard>
                            </SmallStatsGrid>
                        </StatsGrid>
                    </StatsSection>
                )}
            </ContentContainer>
        </MainContainer>
    );
};

export default MateriaDetalle;

/* ---------- ANIMACIONES ---------- */

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

/* ---------- CONTENEDORES PRINCIPALES ---------- */

const MainContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
`;

const HeaderSection = styled.div`
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
    width: 56px;
    height: 56px;
    border: 4px solid #e5e7eb;
    border-top-color: ${props => props.theme?.primary || '#ff6b35'};
    border-radius: 50%;
    animation: ${rotate} 0.8s linear infinite;
`;

const LoadingText = styled.p`
    font-size: 16px;
    color: #6b7280;
    font-weight: 500;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 16px;
    padding: 24px;
`;

const ErrorIcon = styled.div`
    color: #ef4444;
    margin-bottom: 8px;
`;

const ErrorTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin: 0;
`;

const ErrorText = styled.p`
    font-size: 16px;
    color: #6b7280;
    text-align: center;
    max-width: 400px;
`;

const BackButton = styled.button`
    margin-top: 16px;
    padding: 12px 32px;
    background: ${props => props.color};
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px ${props => props.color}33;
    }
`;

/* ---------- HERO SECTION ---------- */

const SubjectHero = styled.div`
    position: relative;
    padding: 40px 32px;
    overflow: hidden;
    animation: ${fadeIn} 0.5s ease;
`;

const HeroBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0.03;
`;

const HeroPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.01) 35px, rgba(0,0,0,.01) 70px);
`;

const HeroContent = styled.div`
    position: relative;
    display: flex;
    gap: 32px;
    max-width: 1400px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

const SubjectImageWrapper = styled.div`
    position: relative;
    flex-shrink: 0;
`;

const SubjectImage = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 24px;
    object-fit: cover;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const SubjectBadge = styled.div`
    position: absolute;
    bottom: -8px;
    right: -8px;
    width: 44px;
    height: 44px;
    background: ${props => props.color};
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px ${props => props.color}40;
`;

const SubjectInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const SubjectCode = styled.span`
    display: inline-block;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    width: fit-content;
`;

const SubjectName = styled.h1`
    margin: 0;
    font-size: 36px;
    font-weight: 800;
    color: #111827;
    line-height: 1.2;
`;

const SubjectMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #4b5563;
    font-size: 14px;
    
    svg {
        color: #9ca3af;
    }
`;

const QuickStats = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-top: 8px;
`;

const QuickStatCard = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: ${props => props.color}08;
    border-radius: 16px;
    border: 1px solid ${props => props.color}20;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${props => props.color}15;
        background: ${props => props.color}12;
    }
`;

const QuickStatIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 12px;
    flex-shrink: 0;
`;

const QuickStatInfo = styled.div``;

const QuickStatValue = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #111827;
`;

const QuickStatLabel = styled.div`
    font-size: 11px;
    color: #6b7280;
    font-weight: 500;
`;

/* ---------- TABS ---------- */

const TabsContainer = styled.div`
    display: flex;
    gap: 8px;
    padding: 0 32px 24px 32px;
    background: white;
    overflow-x: auto;
    
    &::-webkit-scrollbar {
        height: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #e5e7eb;
        border-radius: 999px;
    }
`;

const TabButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: ${props => props.active ? props.color + '15' : 'transparent'};
    border: 2px solid ${props => props.active ? props.color : '#e5e7eb'};
    border-radius: 12px;
    color: ${props => props.active ? props.color : '#6b7280'};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    
    &:hover {
        background: ${props => props.color}15;
        border-color: ${props => props.color};
        color: ${props => props.color};
        transform: translateY(-1px);
    }
`;

const TabBadge = styled.span`
    padding: 2px 8px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
`;

/* ---------- CONTENIDO ---------- */

const ContentContainer = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px;
    animation: ${fadeIn} 0.4s ease;
`;

/* ---------- PROYECTOS ---------- */

const ProjectsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SelectedProjectCard = styled.div`
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    animation: ${slideIn} 0.3s ease;
`;

const ProjectCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: ${props => props.color}08;
    border-bottom: 2px solid ${props => props.color}20;
`;

const ProjectIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 16px;
    flex-shrink: 0;
`;

const ProjectHeaderInfo = styled.div``;

const ProjectBadge = styled.span`
    display: inline-block;
    padding: 4px 12px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
`;

const ProjectTitle = styled.h2`
    margin: 0 0 4px 0;
    font-size: 24px;
    font-weight: 700;
    color: #111827;
`;

const ProjectCode = styled.p`
    margin: 0;
    font-size: 14px;
    color: #6b7280;
`;

const ProjectCardBody = styled.div`
    padding: 24px;
`;

const ProjectDescription = styled.p`
    font-size: 15px;
    line-height: 1.6;
    color: #4b5563;
    margin: 0 0 24px 0;
`;

const ProjectProgressSection = styled.div`
    padding: 20px;
    background: #f9fafb;
    border-radius: 16px;
    margin-bottom: 24px;
`;

const ProgressHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const ProgressTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
`;

const ProgressPercentage = styled.div`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.color};
`;

const ProgressBar = styled.div`
    height: 14px;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 12px;
`;

const ProgressFill = styled.div`
    height: 100%;
    width: ${props => props.width}%;
    background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}cc);
    border-radius: 999px;
    position: relative;
    transition: width 1s ease;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: ${shimmer} 2s infinite;
    }
`;

const ProgressMeta = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ProgressDate = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #6b7280;
`;

const ProjectStats = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
`;

const ProjectStatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    background: #f9fafb;
    border-radius: 16px;
    text-align: center;
`;

const ProjectStatIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${props => props.color}15;
    border-radius: 12px;
    margin-bottom: 8px;
    
    svg {
        color: ${props => props.color};
    }
`;

const ProjectStatLabel = styled.div`
    font-size: 11px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
`;

const ProjectStatValue = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #111827;
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
`;

const ProjectCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 20px;
    border: 2px solid ${props => props.selected ? props.theme?.primary || '#ff6b35' : '#e5e7eb'};
    box-shadow: ${props => props.selected ? `0 8px 24px ${props.theme?.primary || '#ff6b35'}20` : '0 2px 8px rgba(0, 0, 0, 0.04)'};
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    }
`;

const ProjectCardTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
`;

const ProjectCardIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${props => props.color}15;
    border-radius: 12px;
    
    svg {
        color: ${props => props.color};
    }
`;

const ProjectCardStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: ${props => props.color}15;
    color: ${props => props.color};
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
`;

const ProjectCardTitle = styled.h3`
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
`;

const ProjectCardCode = styled.p`
    margin: 0 0 16px 0;
    font-size: 13px;
    color: #6b7280;
`;

const ProjectCardProgress = styled.div`
    margin-bottom: 16px;
`;

const MiniProgressBar = styled.div`
    height: 6px;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 8px;
`;

const MiniProgressFill = styled.div`
    height: 100%;
    width: ${props => props.width}%;
    background: ${props => props.color};
    border-radius: 999px;
    transition: width 0.5s ease;
`;

const ProgressText = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

const ProjectCardDates = styled.div`
    display: flex;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;
`;

const DateItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #6b7280;
`;

const ProjectCardExpanded = styled.div`
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;
    animation: ${fadeIn} 0.3s ease;
`;

const ExpandedDescription = styled.p`
    font-size: 13px;
    line-height: 1.6;
    color: #4b5563;
    margin: 0 0 16px 0;
`;

const ViewProjectButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 10px;
    background: ${props => props.color};
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px ${props => props.color}40;
        
        svg {
            transform: translateX(2px);
        }
    }
`;

/* ---------- ENTREGAS ---------- */

const DeliveriesSection = styled.div``;

const DeliveriesHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
    }
`;

const SectionTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #111827;
`;

const FilterButtons = styled.div`
    display: flex;
    gap: 8px;
`;

const FilterButton = styled.button`
    padding: 8px 16px;
    background: ${props => props.active ? props.color : 'white'};
    color: ${props => props.active ? 'white' : props.color};
    border: 2px solid ${props => props.color};
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.color};
        color: white;
        transform: translateY(-1px);
    }
`;

const DeliveriesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
`;

const DeliveryCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    }
`;

const DeliveryHeader = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
`;

const DeliveryIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: ${props => props.color}15;
    border-radius: 14px;
    flex-shrink: 0;
    
    svg {
        color: ${props => props.color};
    }
`;

const DeliveryHeaderInfo = styled.div``;

const DeliveryTitle = styled.h3`
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 700;
    color: #111827;
`;

const DeliveryCode = styled.p`
    margin: 0;
    font-size: 12px;
    color: #6b7280;
`;

const DeliveryBody = styled.div``;

const DeliveryMetaRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const DeliveryMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const MetaIcon = styled.span`
    display: flex;
    color: #9ca3af;
`;

const MetaText = styled.span`
    font-size: 13px;
    color: #4b5563;
`;

const DeliveryStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: ${props => props.color}15;
    color: ${props => props.color};
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
`;

const GradeSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f9fafb;
    border-radius: 12px;
    margin-bottom: 16px;
`;

const GradeLabel = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
`;

const GradeValue = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.color};
    
    svg {
        color: ${props => props.color};
    }
`;

const DeliveryActions = styled.div`
    display: flex;
    gap: 8px;
`;

const ActionButton = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px;
    background: ${props => props.primary ? props.color : 'white'};
    color: ${props => props.primary ? 'white' : props.color};
    border: 2px solid ${props => props.color};
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px ${props => props.color}30;
        background: ${props => props.primary ? props.color + 'ee' : props.color + '10'};
    }
`;

/* ---------- PIZARRAS ---------- */

const BoardsSection = styled.div``;

const BoardsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const CreateBoardButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: ${props => props.color};
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px ${props => props.color}40;
        
        svg {
            animation: ${pulse} 0.5s ease;
        }
    }
`;

const BoardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 20px;
`;

const BoardCard = styled.div`
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    }
`;

const BoardCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
`;

const BoardIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: white;
    border-radius: 16px;
    
    svg {
        color: ${props => props.color};
    }
`;

const BoardBadge = styled.span`
    padding: 6px 12px;
    background: white;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #6b7280;
`;

const BoardCardBody = styled.div`
    padding: 20px;
`;

const BoardTitle = styled.h3`
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
`;

const BoardCode = styled.p`
    margin: 0 0 16px 0;
    font-size: 12px;
    color: #6b7280;
`;

const BoardMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 12px;
    margin-bottom: 16px;
`;

const BoardMetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #4b5563;
    
    svg {
        color: #9ca3af;
    }
`;

const BoardActions = styled.div`
    display: flex;
    gap: 8px;
`;

const BoardButton = styled.a`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px;
    background: ${props => props.primary ? props.color : 'white'};
    color: ${props => props.primary ? 'white' : props.color};
    border: 2px solid ${props => props.color};
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px ${props => props.color}30;
        background: ${props => props.primary ? props.color + 'ee' : props.color + '10'};
    }
`;

/* ---------- ESTADÍSTICAS ---------- */

const StatsSection = styled.div``;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const BigStatCard = styled.div`
    background: white;
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const BigStatHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    
    svg {
        color: ${props => props.color};
    }
`;

const BigStatTitle = styled.h3`
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #111827;
`;

const BigStatValue = styled.div`
    font-size: 48px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 8px;
`;

const BigStatLabel = styled.p`
    margin: 0 0 24px 0;
    font-size: 14px;
    color: #6b7280;
`;

const StatChart = styled.div`
    height: 200px;
    background: #f9fafb;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChartPlaceholder = styled.div`
    font-size: 24px;
    color: #9ca3af;
`;

const SmallStatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
`;

const SmallStatCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    display: flex;
    gap: 16px;
    align-items: center;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        
        > div:first-child {
            transform: rotate(10deg) scale(1.1);
        }
    }
`;

const SmallStatIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: ${props => props.color}15;
    border-radius: 14px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
    
    svg {
        color: ${props => props.color};
    }
`;

const SmallStatInfo = styled.div``;

const SmallStatValue = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #111827;
`;

const SmallStatLabel = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

/* ---------- EMPTY STATE ---------- */

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    text-align: center;
`;

const EmptyIcon = styled.div`
    color: #d1d5db;
    margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 700;
    color: #374151;
`;

const EmptyText = styled.p`
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    max-width: 320px;
`;