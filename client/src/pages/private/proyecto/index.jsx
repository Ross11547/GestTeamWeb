import React, { useState } from "react";
import {
  Folder,
  File,
  Edit2,
  Trash2,
  Upload,
  Plus,
  X,
  Save,
  ArrowLeft,
  Search,
  Grid,
  List,
  Settings,
  HelpCircle
} from "lucide-react";
import styled from "styled-components";
import { useColors } from "../../../style/colors";

const Proyecto = () => {
  const Colors = useColors(); // única paleta

  const [folders, setFolders] = useState([
    { id: "1", name: "Documentos", files: [] },
    {
      id: "2",
      name: "Investigaciones",
      files: [
        { id: "f1", name: "Cancer.pdf", type: "pdf" },
        { id: "f2", name: "documento.pdf", type: "pdf" },
        { id: "f3", name: "celulas.txt", type: "document" }
      ]
    }
  ]);

  const [currentFolder, setCurrentFolder] = useState(null);
  const [editingFolder, setEditingFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSection] = useState("all");

  const handleCreateFolder = () => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: "Nueva Carpeta",
      files: []
    };

    setFolders([...folders, newFolder]);
    setEditingFolder(newFolder.id);
    setNewFolderName(newFolder.name);
  };

  const handleSaveFolderName = () => {
    const updatedFolders = folders.map((folder) =>
      folder.id === editingFolder
        ? { ...folder, name: newFolderName }
        : folder
    );

    setFolders(updatedFolders);
    setEditingFolder(null);
  };

  const handleDeleteFolder = (folderId) => {
    const updatedFolders = folders.filter((folder) => folder.id !== folderId);
    setFolders(updatedFolders);

    if (currentFolder && currentFolder.id === folderId) {
      setCurrentFolder(null);
    }
  };

  const handleFileUpload = (folderId, fileName, fileType) => {
    const newFile = {
      id: `file-${Date.now()}`,
      name: fileName || `archivo-${Date.now()}.${fileType || "txt"}`,
      type: fileType || "document"
    };

    const updatedFolders = folders.map((folder) =>
      folder.id === folderId
        ? { ...folder, files: [...folder.files, newFile] }
        : folder
    );

    setFolders(updatedFolders);
    setShowFileUpload(false);

    if (currentFolder && currentFolder.id === folderId) {
      setCurrentFolder(updatedFolders.find((f) => f.id === folderId));
    }
  };

  const handleDeleteFile = (fileId) => {
    if (!currentFolder) return;

    const updatedFiles = currentFolder.files.filter(
      (file) => file.id !== fileId
    );

    const updatedFolders = folders.map((folder) =>
      folder.id === currentFolder.id
        ? { ...folder, files: updatedFiles }
        : folder
    );

    setFolders(updatedFolders);
    setCurrentFolder({ ...currentFolder, files: updatedFiles });
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "image":
        return <FileIcon color="#4CAF50">IMG</FileIcon>;
      case "pdf":
        return <FileIcon color="#F44336">PDF</FileIcon>;
      case "document":
        return <FileIcon color={Colors.primary}>DOC</FileIcon>;
      default:
        return <FileIcon color="#9E9E9E">FILE</FileIcon>;
    }
  };

  const getFilteredFolders = () => {
    let filtered = folders;

    if (searchQuery) {
      filtered = filtered.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // puedes aplicar lógica para "starred" o "recent" si luego la usas
    return filtered;
  };

  return (
    <Container>
      <TopNavBar>
        <LogoSection>
          <LogoText accent={Colors.primary}>Mis proyectos</LogoText>
        </LogoSection>

        <SearchSection>
          <SearchBar>
            <SearchIcon>
              <Search size={18} color="#6B7280" />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Buscar proyecto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
        </SearchSection>

        <UserActions>
          <IconButton title="Ver ajustes">
            <Settings size={18} />
          </IconButton>
          <IconButton title="Ayuda">
            <HelpCircle size={18} />
          </IconButton>
        </UserActions>
      </TopNavBar>

      <MainContent>
        <Content>
          <ControlBar>
            <div>
              <PageTitle>
                {currentFolder
                  ? currentFolder.name
                  : selectedSection === "all"
                  ? "Mi unidad"
                  : selectedSection === "starred"
                  ? "Destacados"
                  : "Recientes"}
              </PageTitle>
            </div>

            <ControlActions>
              <ViewToggle>
                <ViewButton
                  active={viewMode === "grid"}
                  onClick={() => setViewMode("grid")}
                  title="Vista de cuadrícula"
                >
                  <Grid size={18} />
                </ViewButton>
                <ViewButton
                  active={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                  title="Vista de lista"
                >
                  <List size={18} />
                </ViewButton>
              </ViewToggle>

              <CreateButton
                accent={Colors.primary}
                accentHover={Colors.primaryDark}
                onClick={handleCreateFolder}
              >
                <Plus size={18} />
                Crear Carpeta
              </CreateButton>
            </ControlActions>
          </ControlBar>

          {currentFolder ? (
            <FolderView>
              <FolderHeader>
                <BackButton onClick={() => setCurrentFolder(null)}>
                  <ArrowLeft size={18} />
                  Volver
                </BackButton>
                <FolderTitle>{currentFolder.name}</FolderTitle>
                <UploadButton
                  accent={Colors.primary}
                  accentHover={Colors.primaryDark}
                  onClick={() => setShowFileUpload(true)}
                >
                  <Upload size={18} />
                  Subir Archivo
                </UploadButton>
              </FolderHeader>

              {currentFolder.files.length > 0 ? (
                <FileGrid viewMode={viewMode}>
                  {currentFolder.files.map((file) => (
                    <FileCard key={file.id} viewMode={viewMode}>
                      {getFileIcon(file.type)}
                      <FileName>{file.name}</FileName>
                      <ActionButton onClick={() => handleDeleteFile(file.id)}>
                        <Trash2 size={16} />
                      </ActionButton>
                    </FileCard>
                  ))}
                </FileGrid>
              ) : (
                <EmptyState>
                  <Upload size={48} color="#9ca3af" />
                  <p>Esta carpeta está vacía. Sube archivos para comenzar.</p>
                </EmptyState>
              )}
            </FolderView>
          ) : (
            <FolderGrid viewMode={viewMode}>
              {getFilteredFolders().map((folder) => (
                <FolderCard key={folder.id} viewMode={viewMode}>
                  <FolderIcon viewMode={viewMode}>
                    <Folder
                      size={viewMode === "grid" ? 24 : 20}
                      color="#4B5563"
                    />
                    <FileCount>{folder.files.length}</FileCount>
                  </FolderIcon>

                  {editingFolder === folder.id ? (
                    <EditNameForm>
                      <EditInput
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        autoFocus
                      />
                      <SaveButton onClick={handleSaveFolderName}>
                        <Save size={16} />
                      </SaveButton>
                      <CancelButton onClick={() => setEditingFolder(null)}>
                        <X size={16} />
                      </CancelButton>
                    </EditNameForm>
                  ) : (
                    <FolderInfo viewMode={viewMode}>
                      <FolderName onClick={() => setCurrentFolder(folder)}>
                        {folder.name}
                      </FolderName>
                      <ActionButtons>
                        <ActionButton
                          onClick={() => {
                            setEditingFolder(folder.id);
                            setNewFolderName(folder.name);
                          }}
                        >
                          <Edit2 size={16} />
                        </ActionButton>
                        <ActionButton
                          onClick={() => handleDeleteFolder(folder.id)}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </ActionButtons>
                    </FolderInfo>
                  )}
                </FolderCard>
              ))}
            </FolderGrid>
          )}
        </Content>
      </MainContent>

      {showFileUpload && currentFolder && (
        <FloatingModal>
          <ModalContent>
            <ModalHeader>
              <h2>Subir Archivo</h2>
              <CloseButton onClick={() => setShowFileUpload(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <UploadForm>
              <FileTypeSelector>
                <FileTypeOption
                  onClick={() =>
                    handleFileUpload(
                      currentFolder.id,
                      "documento.txt",
                      "document"
                    )
                  }
                >
                  <File size={24} />
                  <span>Documento</span>
                </FileTypeOption>
                <FileTypeOption
                  onClick={() =>
                    handleFileUpload(
                      currentFolder.id,
                      "imagen.jpg",
                      "image"
                    )
                  }
                >
                  <File size={24} />
                  <span>Imagen</span>
                </FileTypeOption>
                <FileTypeOption
                  onClick={() =>
                    handleFileUpload(
                      currentFolder.id,
                      "documento.pdf",
                      "pdf"
                    )
                  }
                >
                  <File size={24} />
                  <span>PDF</span>
                </FileTypeOption>
              </FileTypeSelector>
              <UploadNote>
                En una aplicación real, aquí se mostraría un selector de
                archivos.
              </UploadNote>
            </UploadForm>
          </ModalContent>
        </FloatingModal>
      )}
    </Container>
  );
};

export default Proyecto;

// ================== ESTILOS ==================

const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const TopNavBar = styled.div`
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

const LogoSection = styled.div`
  width: 240px;
  display: flex;
  align-items: center;
`;

const LogoText = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${(p) => p.accent || "#3B82F6"};
`;

const SearchSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const SearchBar = styled.div`
  width: 100%;
  max-width: 600px;
  height: 40px;
  background-color: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:focus-within {
    background-color: white;
    box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1),
      0 0 0 4px rgba(15, 23, 42, 0.05);
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 14px;
  color: #4b5563;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 64px);
`;

const Content = styled.div`
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
`;

const ControlActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
`;

const ViewButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? "#e5e7eb" : "transparent"};
  border: none;
  color: ${(props) => (props.active ? "#1f2937" : "#6b7280")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.active ? "#e5e7eb" : "#ebedf0"};
  }
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(p) => p.accent || "#3b82f6"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(p) => p.accentHover || "#2563eb"};
  }
`;

const FolderGrid = styled.div`
  display: ${(props) => (props.viewMode === "grid" ? "grid" : "flex")};
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  flex-direction: ${(props) =>
    props.viewMode === "list" ? "column" : "row"};
  gap: 16px;
`;

const FolderCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: ${(props) => (props.viewMode === "list" ? "flex" : "block")};
  align-items: ${(props) =>
    props.viewMode === "list" ? "center" : "stretch"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08),
      0 3px 6px rgba(0, 0, 0, 0.12);
  }
`;

const FolderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${(props) => (props.viewMode === "list" ? "40px" : "80px")};
  width: ${(props) => (props.viewMode === "list" ? "40px" : "auto")};
  background-color: #f3f4f6;
  border-radius: 8px;
  margin-bottom: ${(props) =>
    props.viewMode === "list" ? "0" : "12px"};
  margin-right: ${(props) =>
    props.viewMode === "list" ? "16px" : "0"};
  flex-shrink: 0;
`;

const FileCount = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: #e5e7eb;
  color: #4b5563;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 12px;
`;

const FolderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const FolderName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #1f2937;
  }
`;

const EditNameForm = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const SaveButton = styled(ActionButton)`
  color: #10b981;

  &:hover {
    background-color: #ecfdf5;
    color: #059669;
  }
`;

const CancelButton = styled(ActionButton)`
  color: #ef4444;

  &:hover {
    background-color: #fef2f2;
    color: #dc2626;
  }
`;

const FolderView = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const FolderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 auto 0 16px;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(p) => p.accent || "#3b82f6"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(p) => p.accentHover || "#2563eb"};
  }
`;

const FileGrid = styled.div`
  display: ${(props) => (props.viewMode === "grid" ? "grid" : "flex")};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  flex-direction: ${(props) =>
    props.viewMode === "list" ? "column" : "row"};
  gap: 16px;
`;

const FileCard = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: ${(props) =>
    props.viewMode === "list" ? "row" : "column"};
  align-items: center;
  position: relative;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const FileIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${(props) => props.color || "#9ca3af"};
  color: white;
  font-weight: 700;
  font-size: 14px;
  border-radius: 8px;
`;

const FileName = styled.span`
  font-size: 14px;
  color: #4b5563;
  text-align: center;
  word-break: break-word;
`;

// Empty state
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;

  p {
    margin-top: 16px;
    max-width: 400px;
  }
`;

// Modal
const FloatingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    color: #1f2937;
  }
`;

const UploadForm = styled.div`
  padding: 20px;
`;

const FileTypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
`;

const FileTypeOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  span {
    font-size: 14px;
    color: #4b5563;
  }

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`;

const UploadNote = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin-top: 16px;
`;
