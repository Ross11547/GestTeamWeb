import { Star, Book, Users, UserCheck } from "lucide-react";
import {
  ProjectCard as Card,
  ProjectType,
  Rating,
  ProjectTitle,
  ProjectInfo,
  Label,
  IconWrapper,
} from "../../style/estudiante/styledInicio";

const ProjectCard = ({ title, type, rating, subject, students, teachers }) => {
  return (
    <Card>
      <ProjectType>{type}</ProjectType>
      <Rating>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "currentColor" : "none"}
            stroke={i < rating ? "currentColor" : "currentColor"}
          />
        ))}
      </Rating>
      <ProjectTitle>{title}</ProjectTitle>
      <ProjectInfo>
        <div>
          <IconWrapper>
            <Book size={16} />
          </IconWrapper>
          <Label>Materia:</Label>
          {subject}
        </div>
        <div>
          <IconWrapper>
            <Users size={16} />
          </IconWrapper>
          <Label>Estudiantes:</Label>
          {students.join(", ")}
        </div>
        <div>
          <IconWrapper>
            <UserCheck size={16} />
          </IconWrapper>
          <Label>Docentes:</Label>
          {teachers.join(", ")}
        </div>
      </ProjectInfo>
    </Card>
  );
};
export default ProjectCard;
