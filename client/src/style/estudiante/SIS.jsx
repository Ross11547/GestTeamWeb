import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
  background-color: #F6F8FA;
  color: #24292E;
`;

export const TopNavBar = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const LogoSection = styled.div`
  width: 240px;
  display: flex;
  align-items: center;
`;

export const LogoText = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #3B82F6;
`;

export const SearchSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const SearchBar = styled.div`
  width: 100%;
  max-width: 600px;
  height: 40px;
  background-color: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  
  &:focus-within {
    background-color: white;
    box-shadow: 0 0 0 1px #3B82F6, 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 14px;
  color: #4B5563;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  cursor: pointer;
  
  &:hover {
    background-color: #F3F4F6;
  }
`;


export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #fc6d26;
  color: white;
  font-size: 10px;
  font-weight: bold;
  height: 16px;
  min-width: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`;

export const AvatarButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

export const MainContent = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
`;

export const Sidebar = styled.div`
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 16px 0;
  flex-shrink: 0;
`;

export const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

export const SidebarHeader = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #24292e;
  padding: 0 16px;
  margin-bottom: 8px;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.active ? props.ColorPro.primary : '#24292e'};
  background-color: ${props => props.active ? props.ColorPro.primary300 : 'transparent'};
  font-weight: ${props => props.active ? '600' : 'normal'};
  border-left: 3px solid ${props => props.active ? props.ColorPro.primary : 'transparent'};
  
  &:hover {
    color: ${props => props.ColorPro.primary};
  }
  
  svg {
    color: ${props => props.active ? props.ColorPro.primary : '#6b7280'};
  }
`;

export const SidebarCreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 16px;
  padding: 8px 12px;
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #24292e;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
    border-color: #bfc7cf;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 24px;
  max-width: calc(100% - 240px);
`;

export const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #24292e;
  margin: 0;
`;

export const ControlActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  overflow: hidden;
`;

export const ViewButton = styled.button`
  background-color: ${props => props.active ? '#f6f8fa' : 'white'};
  border: none;
  border-right: ${props => props.active ? 'none' : '1px solid #d0d7de'};
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.active ? '#24292e' : '#57606a'};
  
  &:last-child {
    border-right: none;
  }
  
  &:hover {
    background-color: #f6f8fa;
  }
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #2da44e;
  color: white;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #2c974b;
  }
`;

export const ProjectList = styled.div`
  display: ${props => props.viewMode === 'grid' ? 'grid' : 'flex'};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  flex-direction: ${props => props.viewMode === 'grid' ? 'row' : 'column'};
  gap: 16px;
`;

export const ProjectCard = styled.div`
  background-color: white;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 16px;
  transition: border-color 0.2s, transform 0.2s;
  
  &:hover {
    border-color: #9ca3af;
    transform: translateY(-2px);
  }
  
  width: ${props => props.viewMode === 'grid' ? '100%' : '100%'};
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: ${props => props.viewMode === 'grid' ? 'column' : 'row'};
  justify-content: space-between;
  align-items: ${props => props.viewMode === 'grid' ? 'flex-start' : 'center'};
  gap: ${props => props.viewMode === 'grid' ? '16px' : '24px'};
`;

export const ProjectName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0969da;
  margin: 0 0 4px 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ProjectDescription = styled.p`
  font-size: ${props => props.small ? '13px' : '14px'};
  color: #57606a;
  margin: ${props => props.small ? '0' : '12px 0'};
  line-height: 1.5;
`;

export const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  color: #57606a;
  flex: 1;
`;

export const ProjectMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProjectTagsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ProjectTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 12px;
  background-color: ${props =>
    props.isPrivate ? '#fff8c5' :
      props.isGroup ? '#ddf4ff' :
        '#f6f8fa'};
  color: ${props =>
    props.isPrivate ? '#9a6700' :
      props.isGroup ? '#0969da' :
        '#57606a'};
  border: 1px solid ${props =>
    props.isPrivate ? '#eac54f' :
      props.isGroup ? '#b6e3ff' :
        '#d0d7de'};
  
  svg {
    color: ${props =>
    props.isPrivate ? '#9a6700' :
      props.isGroup ? '#0969da' :
        '#57606a'};
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid #d0d7de;
  color: #57606a;
  cursor: pointer;
  
  &:hover {
    background-color: #f6f8fa;
    color: #24292e;
  }
`;

export const StarButton = styled(ActionButton)`
  color: #57606a;
  
  &:hover {
    color: #ff9800;
  }
`;

export const EditNameForm = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #d0d7de;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #0969da;
    box-shadow: 0 0 0 2px rgba(9, 105, 218, 0.3);
  }
`;

export const SaveButton = styled(ActionButton)`
  color: #2da44e;
  
  &:hover {
    color: #2c974b;
  }
`;

export const CancelButton = styled(ActionButton)`
  color: #cf222e;
  
  &:hover {
    color: #a40e26;
  }
`;

export const ProjectView = styled.div`
  background-color: white;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 24px;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #57606a;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    color: #0969da;
  }
`;

export const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
`;

export const FolderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.small ? '24px' : '32px'};
  height: ${props => props.small ? '24px' : '32px'};
  background-color: #f6f8fa;
  border-radius: 4px;
  color: #57606a;
`;

export const VisibilityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: normal;
  padding: 2px 6px;
  border-radius: 12px;
  background-color: ${props => props.isPrivate ? '#fff8c5' : '#ddf4ff'};
  color: ${props => props.isPrivate ? '#9a6700' : '#0969da'};
  border: 1px solid ${props => props.isPrivate ? '#eac54f' : '#b6e3ff'};
  
  svg {
    color: ${props => props.isPrivate ? '#9a6700' : '#0969da'};
  }
`;

export const BranchBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: normal;
  padding: 2px 6px;
  border-radius: 12px;
  background-color: #f6f8fa;
  color: #57606a;
  border: 1px solid #d0d7de;
`;

export const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #24292e;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const FileTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  
  th {
    text-align: left;
    padding: 8px 16px;
    border-bottom: 1px solid #d0d7de;
    font-weight: 600;
    color: #57606a;
  }
  
  td {
    padding: 8px 16px;
    border-bottom: 1px solid #d0d7de;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover {
    background-color: #f6f8fa;
  }
`;

export const FileNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.small ? '20px' : '24px'};
  height: ${props => props.small ? '20px' : '24px'};
  background-color: ${props => props.color || '#9ca3af'};
  border-radius: 4px;
  color: white;
  font-size: ${props => props.small ? '8px' : '10px'};
  font-weight: bold;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  
  p {
    margin: 16px 0;
    color: #57606a;
  }
`;

export const EmptyActionButton = styled(UploadButton)`
  background-color: #0969da;
  color: white;
  
  &:hover {
    background-color: #0860c1;
  }
`;

export const CollaboratorsGroup = styled.div`
  display: flex;
  margin-right: 16px;
`;

export const CollaboratorsRowGroup = styled(CollaboratorsGroup)`
  margin: 0;
`;

export const CollaboratorAvatar = styled.div`
  width: ${props => props.small ? '20px' : '24px'};
  height: ${props => props.small ? '20px' : '24px'};
  border-radius: 50%;
  background-color: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.small ? '8px' : '10px'};
  font-weight: bold;
  margin-right: -8px;
  border: 2px solid white;
  
  &:last-child {
    margin-right: 0;
  }
`;

export const FloatingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 6px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #d0d7de;
  
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #57606a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #24292e;
  }
`;

export const CreateProjectForm = styled.div`
  padding: 16px;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  
  span {
    color: #cf222e;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #0969da;
    box-shadow: 0 0 0 2px rgba(9, 105, 218, 0.3);
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #0969da;
    box-shadow: 0 0 0 2px rgba(9, 105, 218, 0.3);
  }
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OptionItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${props => props.active ? '#0969da' : '#d0d7de'};
  border-radius: 6px;
  cursor: pointer;
  background-color: ${props => props.active ? '#f0f6fc' : 'white'};
  
  svg {
    color: ${props => props.active ? '#0969da' : '#57606a'};
  }
  
  &:hover {
    background-color: #f6f8fa;
  }
`;

export const OptionTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

export const OptionDescription = styled.div`
  font-size: 12px;
  color: #57606a;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const CancelModalButton = styled.button`
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #24292e;
  cursor: pointer;
  
  &:hover {
    background-color: #f6f8fa;
  }
`;

export const CreateRepoButton = styled.button`
  padding: 8px 16px;
  background-color: #2da44e;
  color: white;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #2c974b;
  }
`;

export const CollaboratorsList = styled.div`
  margin-top: 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
`;

export const CollaboratorItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #d0d7de;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f6f8fa;
  }
`;

export const CollaboratorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CollaboratorName = styled.div`
  font-weight: 500;
`;

export const CollaboratorEmail = styled.div`
  font-size: 12px;
  color: #57606a;
`;

export const CollaboratorCheckbox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid ${props => props.isSelected ? '#0969da' : '#d0d7de'};
  background-color: ${props => props.isSelected ? '#0969da' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  
  &:hover {
    border-color: #0969da;
  }
`;

export const UploadForm = styled.div`
  padding: 16px;
`;

export const FileTypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const FileTypeOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background-color: #f6f8fa;
    border-color: #0969da;
  }
`;

export const UploadNote = styled.p`
  text-align: center;
  color: #57606a;
  font-size: 14px;
  margin-top: 24px;
`;