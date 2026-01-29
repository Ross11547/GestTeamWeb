import React, { useState } from 'react';
import styled from 'styled-components';
import {
  HelpCircle, BookOpen, Headphones, Rocket, FolderCog, Users,
  ClipboardCheck, Database, ChevronRight, MessageCircle, Mail,
  MessageSquare, Ticket, Clock, ArrowRight, Search, Phone,
  Globe, Shield, Star, CheckCircle, AlertCircle
} from 'lucide-react';
import { Colors, ColorsLogin } from '../../style/colors';

const Container = styled.div`
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
`;

const TabsContainer = styled.div`
  background: ${Colors.white};
  padding: 24px;

`;

const TabsWrapper = styled.div`
  display: flex;
  gap: 8px;
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  background: ${props => props.active ? ColorsLogin.secondary100 : 'transparent'};
  border: 2px solid ${props => props.active ? ColorsLogin.secondary100 : '#e9ecef'};
  padding: 14px 24px;
  border-radius: 12px;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: ${props => props.active ? ColorsLogin.secondary100 : '#f8f9fa'};
    border-color: ${ColorsLogin.secondary100};
    transform: translateY(-2px);
  }
`;

const TabText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.active ? Colors.white : Colors.greyDark};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
`;

const Section = styled.div`
  animation: fadeIn 0.6s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-top: 5px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${Colors.greyDark};
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${Colors.greyLight};
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto 40px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 50px 16px 20px;
  border: 2px solid #e9ecef;
  border-radius: 50px;
  font-size: 16px;
  background: ${Colors.white};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${ColorsLogin.secondary100};
    box-shadow: 0 0 0 3px ${ColorsLogin.secondary100}15;
  }
  
  &::placeholder {
    color: ${Colors.greyLight};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${Colors.greyLight};
`;

// Manual Styles
const ManualGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
`;

const ManualCard = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${ColorsLogin.secondary100};
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    
    &::before {
      transform: scaleY(1);
    }
  }
`;

const ManualHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const ManualIconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${ColorsLogin.secondary100}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const ManualTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  margin: 0;
  flex: 1;
`;

const ManualContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ManualItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
`;

const ManualItemText = styled.span`
  font-size: 0.95rem;
  color: ${Colors.greyLight};
  line-height: 1.5;
  flex: 1;
`;

// FAQ Styles
const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQCard = styled.div`
  background: ${Colors.white};
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${ColorsLogin.secondary100};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateX(4px);
  }
`;

const FAQQuestion = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
`;

const FAQQuestionText = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  flex: 1;
  line-height: 1.4;
  margin: 0;
`;

const FAQAnswer = styled.p`
  font-size: 1rem;
  color: ${Colors.greyLight};
  line-height: 1.6;
  margin: 0 0 0 36px;
`;

// Soporte Styles
const SoporteContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const HorarioInfo = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, ${ColorsLogin.secondary100}15, ${ColorsLogin.secondary200}10);
  padding: 20px 24px;
  border-radius: 16px;
  margin-bottom: 32px;
  gap: 16px;
  border: 2px solid ${ColorsLogin.secondary100}20;
`;

const HorarioContent = styled.div`
  flex: 1;
`;

const HorarioTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  margin-bottom: 4px;
`;

const HorarioText = styled.div`
  font-size: 0.9rem;
  color: ${Colors.greyLight};
`;

const SoporteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const SoporteCard = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SoporteIconContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const SoporteContent = styled.div`
  flex: 1;
`;

const SoporteTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  margin: 0 0 6px 0;
`;

const SoporteDescription = styled.p`
  font-size: 0.9rem;
  color: ${Colors.greyLight};
  line-height: 1.4;
  margin: 0;
`;
const CentroAyuda = () => {
  const [selectedSection, setSelectedSection] = useState('manual');
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    { id: 'manual', title: 'Manual de Uso', icon: BookOpen },
    { id: 'faq', title: 'Preguntas Frecuentes', icon: HelpCircle },
    { id: 'soporte', title: 'Contactar Soporte', icon: Headphones },
  ];

  const manualSections = [
    {
      id: 1,
      title: 'Primeros Pasos en GestTeam',
      icon: Rocket,
      items: [
        'Configuración inicial de tu cuenta UNIFRANZ',
        'Navegación por el dashboard principal',
        'Personalización de tu perfil académico',
        'Configuración de notificaciones y alertas',
        'Tour guiado por las funcionalidades clave'
      ]
    },
    {
      id: 2,
      title: 'Gestión Académica',
      icon: FolderCog,
      items: [
        'Crear y organizar materias y horarios',
        'Gestión de evaluaciones y calificaciones',
        'Seguimiento de asistencia estudiantil',
        'Generación de reportes académicos',
        'Planificación de contenidos curriculares'
      ]
    },
    {
      id: 3,
      title: 'Colaboración y Comunicación',
      icon: Users,
      items: [
        'Sistema de mensajería académica',
        'Foros de discusión por materia',
        'Videoconferencias integradas',
        'Trabajo colaborativo en tiempo real',
        'Notificaciones y alertas académicas'
      ]
    },
    {
      id: 4,
      title: 'Evaluación y Seguimiento',
      icon: ClipboardCheck,
      items: [
        'Creación de evaluaciones en línea',
        'Sistema de calificación automática',
        'Seguimiento de progreso estudiantil',
        'Reportes de rendimiento académico',
        'Análisis estadístico de resultados'
      ]
    },
    {
      id: 5,
      title: 'Recursos y Biblioteca',
      icon: Database,
      items: [
        'Gestión de recursos educativos',
        'Biblioteca digital institucional',
        'Sistema de búsqueda avanzada',
        'Compartir materiales entre docentes',
        'Backup y sincronización de contenidos'
      ]
    },
  ];

  const faqItems = [
    {
      question: '¿Cómo accedo por primera vez a GestTeam?',
      answer: 'Utiliza tu correo institucional @unifranz.edu.bo y la contraseña temporal proporcionada por el departamento de sistemas. Deberás cambiarla en el primer acceso.',
    },
    {
      question: '¿Puedo usar GestTeam desde mi dispositivo móvil?',
      answer: 'Sí, GestTeam es completamente responsive y funciona en todos los dispositivos. También tenemos aplicaciones móviles nativas para iOS y Android.',
    },
    {
      question: '¿Cómo sincronizo mis materias del semestre actual?',
      answer: 'La sincronización es automática con el sistema académico de UNIFRANZ. Si tienes problemas, contacta al soporte técnico para verificar tu vinculación.',
    },
    {
      question: '¿Qué formatos de archivo puedo compartir?',
      answer: 'Admitimos PDF, Word, PowerPoint, Excel, imágenes y videos educativos. El tamaño máximo por archivo es de 500MB.',
    },
    {
      question: '¿Cómo recupero archivos eliminados accidentalmente?',
      answer: 'Los archivos se mantienen en papelera por 30 días. Ve a "Archivos eliminados" en tu perfil o contacta soporte para recuperación de respaldo.',
    },
    {
      question: '¿GestTeam funciona sin conexión a internet?',
      answer: 'Algunas funciones están disponibles offline en la app móvil. Los cambios se sincronizarán automáticamente cuando recuperes la conexión.',
    }
  ];

  const soporteOptions = [
    {
      id: 1,
      title: 'Chat en Vivo',
      description: 'Soporte inmediato con nuestro equipo técnico',
      icon: MessageCircle,
      action: () => alert('Iniciando chat con soporte técnico...'),
      color: ColorsLogin.secondary100,
    },
    {
      id: 2,
      title: 'Soporte por Email',
      description: 'soporte.gestteam@unifranz.edu.bo',
      icon: Mail,
      action: () => window.open('mailto:soporte.gestteam@unifranz.edu.bo'),
      color: '#7c3aed',
    },
    {
      id: 3,
      title: 'Mesa de Ayuda',
      description: 'Ticket de soporte especializado',
      icon: Ticket,
      action: () => alert('Redirigiendo al portal de tickets...'),
      color: '#16a34a',
    },
    {
      id: 4,
      title: 'Teléfono de Soporte',
      description: '+591 63986377',
      icon: Phone,
      action: () => window.open('tel:+59163986377'),
      color: '#dc2626',
    }
  ];

  return (
    <Container>

      <Content>

        {selectedSection === 'manual' && (
          <Section>
            <SectionHeader>
              <SectionTitle>Manual del Usuario</SectionTitle>
              <SectionSubtitle>
                Guías completas para dominar todas las funcionalidades de GestTeam
              </SectionSubtitle>
            </SectionHeader>

            <TabsContainer>
              <TabsWrapper>
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <Tab
                      key={section.id}
                      active={selectedSection === section.id}
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <IconComponent
                        size={20}
                        color={selectedSection === section.id ? Colors.white : Colors.greyDark}
                        strokeWidth={2}
                      />
                      <TabText active={selectedSection === section.id}>
                        {section.title}
                      </TabText>
                    </Tab>
                  );
                })}
              </TabsWrapper>
            </TabsContainer>

            <ManualGrid>
              {manualSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <ManualCard key={section.id}>
                    <ManualHeader>
                      <ManualIconContainer>
                        <IconComponent size={28} color={ColorsLogin.secondary100} strokeWidth={2} />
                      </ManualIconContainer>
                      <ManualTitle>{section.title}</ManualTitle>
                    </ManualHeader>
                    <ManualContent>
                      {section.items.map((item, index) => (
                        <ManualItem key={index}>
                          <ChevronRight size={16} color={ColorsLogin.secondary100} strokeWidth={2} />
                          <ManualItemText>{item}</ManualItemText>
                        </ManualItem>
                      ))}
                    </ManualContent>
                  </ManualCard>
                );
              })}
            </ManualGrid>
          </Section>
        )}

        {selectedSection === 'faq' && (
          <Section>
            <SectionHeader>
              <SectionTitle>Preguntas Frecuentes</SectionTitle>
              <SectionSubtitle>
                Respuestas a las consultas más comunes sobre GestTeam
              </SectionSubtitle>
            </SectionHeader>

            <TabsContainer>
              <TabsWrapper>
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <Tab
                      key={section.id}
                      active={selectedSection === section.id}
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <IconComponent
                        size={20}
                        color={selectedSection === section.id ? Colors.white : Colors.greyDark}
                        strokeWidth={2}
                      />
                      <TabText active={selectedSection === section.id}>
                        {section.title}
                      </TabText>
                    </Tab>
                  );
                })}
              </TabsWrapper>
            </TabsContainer>

            <SearchContainer>
              <SearchInput
                placeholder="Buscar en preguntas frecuentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon>
                <Search size={20} />
              </SearchIcon>
            </SearchContainer>

            <FAQContainer>
              {faqItems
                .filter(item =>
                  item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.answer.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <FAQCard key={index}>
                    <FAQQuestion>
                      <HelpCircle size={20} color={ColorsLogin.secondary100} strokeWidth={2} />
                      <FAQQuestionText>{item.question}</FAQQuestionText>
                    </FAQQuestion>
                    <FAQAnswer>{item.answer}</FAQAnswer>
                  </FAQCard>
                ))
              }
            </FAQContainer>
          </Section>
        )}

        {selectedSection === 'soporte' && (
          <Section>
            <SectionHeader>
              <SectionTitle>Contactar Soporte</SectionTitle>
              <SectionSubtitle>
                Múltiples canales de atención para resolver tus consultas
              </SectionSubtitle>
            </SectionHeader>

            <TabsContainer>
              <TabsWrapper>
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <Tab
                      key={section.id}
                      active={selectedSection === section.id}
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <IconComponent
                        size={20}
                        color={selectedSection === section.id ? Colors.white : Colors.greyDark}
                        strokeWidth={2}
                      />
                      <TabText active={selectedSection === section.id}>
                        {section.title}
                      </TabText>
                    </Tab>
                  );
                })}
              </TabsWrapper>
            </TabsContainer>

            <SoporteContainer>
              <HorarioInfo>
                <Clock size={24} color={ColorsLogin.secondary100} strokeWidth={2} />
                <HorarioContent>
                  <HorarioTitle>Horario de Atención</HorarioTitle>
                  <HorarioText>Lunes a Viernes: 8:00 - 18:00 | Sábados: 9:00 - 13:00</HorarioText>
                </HorarioContent>
              </HorarioInfo>

              <SoporteGrid>
                {soporteOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <SoporteCard key={option.id} onClick={option.action}>
                      <SoporteIconContainer bgColor={`${option.color}15`}>
                        <IconComponent size={26} color={option.color} strokeWidth={2} />
                      </SoporteIconContainer>
                      <SoporteContent>
                        <SoporteTitle>{option.title}</SoporteTitle>
                        <SoporteDescription>{option.description}</SoporteDescription>
                      </SoporteContent>
                      <ArrowRight size={18} color={Colors.greyLight} strokeWidth={2} />
                    </SoporteCard>
                  );
                })}
              </SoporteGrid>
            </SoporteContainer>
          </Section>
        )}
      </Content>
    </Container>
  );
};

export default CentroAyuda;