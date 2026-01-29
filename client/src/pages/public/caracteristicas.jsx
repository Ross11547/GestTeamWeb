import React from 'react';
import styled from 'styled-components';
import {
  Star, FolderOpen, Users, Database, GitBranch, ClipboardCheck,
  FileSearch, ArrowRight, GraduationCap, BookOpen, Shield,
  Award, TrendingUp, Clock
} from 'lucide-react';
import { Colors, ColorsLogin } from '../../style/colors';

const Container = styled.div`
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FeatureCard = styled.div`
  background: ${Colors.white};
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.accentColor};
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    &::before {
      transform: scaleY(1);
    }
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const FeatureIconContainer = styled.div`
  width: 72px;
  height: 72px;
  background: ${props => props.bgColor}15;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: ${props => props.bgColor}25;
  }
`;

const FeatureBadge = styled.div`
  background: ${props => props.bgColor}15;
  color: ${props => props.bgColor};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  margin: 0 0 12px 0;
  letter-spacing: -0.3px;
  line-height: 1.3;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${Colors.greyLight};
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: ${Colors.greyLight};
  
  &::before {
    content: '✓';
    color: ${props => props.checkColor};
    font-weight: bold;
    margin-right: 8px;
    font-size: 1rem;
  }
`;

const FeatureFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f1f3f4;
`;

const FeatureAction = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.color};
  font-weight: 500;
  font-size: 0.9rem;
  opacity: 0.7;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    opacity: 1;
    transform: translateX(4px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${Colors.greyDark};
  margin: 0 0 16px 0;
  text-align: center;
  letter-spacing: -0.5px;
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  color: ${Colors.greyLight};
  text-align: center;
  line-height: 1.6;
  margin: 0 0 60px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Caracteristicas = () => {

  const features = [
    {
      id: 1,
      title: 'Gestión Integral Académica',
      description: 'Sistema completo para administrar estudiantes, docentes, materias y horarios con seguimiento en tiempo real.',
      icon: FolderOpen,
      color: ColorsLogin.secondary200,
      badge: 'Administración',
      benefits: [
        'Control total de procesos académicos',
        'Reportes automáticos y estadísticas',
        'Integración con sistemas existentes'
      ]
    },
    {
      id: 2,
      title: 'Colaboración Educativa',
      description: 'Plataforma que facilita la comunicación entre estudiantes, docentes y administradores en tiempo real.',
      icon: Users,
      color: '#16a34a',
      badge: 'Comunicación',
      benefits: [
        'Mensajería académica integrada',
        'Foros de discusión por materia',
        'Notificaciones inteligentes'
      ]
    },
    {
      id: 3,
      title: 'Recursos Centralizados',
      description: 'Biblioteca digital con acceso seguro a materiales educativos, evaluaciones y recursos multimedia.',
      icon: Database,
      color: '#7c3aed',
      badge: 'Recursos',
      benefits: [
        'Almacenamiento seguro en la nube',
        'Búsqueda avanzada de contenido',
        'Versionado de documentos'
      ]
    },
    {
      id: 4,
      title: 'Seguimiento de Progreso',
      description: 'Monitoreo detallado del avance académico con métricas personalizadas y alertas tempranas.',
      icon: TrendingUp,
      color: '#0891b2',
      badge: 'Análisis',
      benefits: [
        'Dashboard personalizado por rol',
        'Métricas de rendimiento',
        'Alertas de intervención temprana'
      ]
    },
    {
      id: 5,
      title: 'Evaluación Inteligente',
      description: 'Sistema avanzado de evaluaciones con calificación automática y retroalimentación personalizada.',
      icon: ClipboardCheck,
      color: '#ea580c',
      badge: 'Evaluación',
      benefits: [
        'Evaluaciones en línea seguras',
        'Calificación automática',
        'Retroalimentación inmediata'
      ]
    },
    {
      id: 6,
      title: 'Seguridad y Privacidad',
      description: 'Protección avanzada de datos académicos con estándares internacionales de seguridad.',
      icon: Shield,
      color: '#dc2626',
      badge: 'Seguridad',
      benefits: [
        'Encriptación de extremo a extremo',
        'Control de acceso por roles',
        'Auditoría completa de actividades'
      ]
    }
  ];

  return (
    <Container>
      <ContentContainer>
        <SectionTitle>Características Principales</SectionTitle>
        <SectionDescription>
          Descubre las funcionalidades que hacen de GestTeam la solución 
          más completa para la gestión académica universitaria
        </SectionDescription>
        <FeaturesGrid>
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <FeatureCard key={feature.id} accentColor={feature.color}>
                <FeatureHeader>
                  <FeatureIconContainer bgColor={feature.color}>
                    <IconComponent size={32} color={feature.color} strokeWidth={2} />
                  </FeatureIconContainer>
                  <FeatureBadge bgColor={feature.color}>
                    {feature.badge}
                  </FeatureBadge>
                </FeatureHeader>

                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>

                  <FeatureList>
                    {feature.benefits.map((benefit, index) => (
                      <FeatureListItem key={index} checkColor={feature.color}>
                        {benefit}
                      </FeatureListItem>
                    ))}
                  </FeatureList>
                </FeatureContent>

                <FeatureFooter>
                  <FeatureAction color={feature.color}>
                    Explorar funcionalidad
                    <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </FeatureAction>
                </FeatureFooter>
              </FeatureCard>
            );
          })}
        </FeaturesGrid>
      </ContentContainer>
    </Container>
  );
};

export default Caracteristicas;