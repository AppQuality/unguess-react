import { useState } from 'react';
import {
  Button,
  Card,
  LG,
  MD,
  Input,
  Textarea,
  Label,
  XL,
  SM,
  TooltipModal,
} from '@appquality/unguess-design-system';
import { useModuleContext } from 'src/features/modules/ModuleWrapper';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';

const TaskCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.xl};
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const TaskType = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const TaskLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const TaskInput = styled(Input)`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const TaskTextarea = styled(Textarea)`
  min-height: 120px;
`;

const TaskActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.lg};
`;

const AddTaskSection = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl} 0;
`;

const TaskPresetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${appTheme.space.md};
`;

const TaskPresetItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${appTheme.space.md};
  cursor: pointer;
  border-radius: ${appTheme.borderRadii.md};

  &:hover {
    background: ${appTheme.palette.grey[100]};
  }
`;

const TaskPresetIcon = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  background: ${appTheme.palette.blue[100]};
  margin-right: ${appTheme.space.md};
`;

const TaskPresetContent = styled.div`
  flex: 1;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: ${appTheme.space.sm};
  margin-bottom: ${appTheme.space.xl};
`;

type TaskKind = 'bug' | 'video' | 'survey';

const TASK_CATEGORIES = {
  functional: {
    label: 'Functional',
    tasks: [
      {
        id: 'exploratory',
        kind: 'bug' as TaskKind,
        title: 'Exploratory Task',
        description:
          'Let testers freely explore your product to uncover issues and opportunities',
      },
      {
        id: 'functional',
        kind: 'bug' as TaskKind,
        title: 'Functional Task',
        description: 'Create targeted tasks to validate key functionalities',
      },
    ],
  },
  experiential: {
    label: 'Experiential',
    tasks: [
      {
        id: 'video',
        kind: 'video' as TaskKind,
        title: 'Think Aloud',
        description: 'Record users as they interact with your product',
      },
    ],
  },
  survey: {
    label: 'Survey',
    tasks: [
      {
        id: 'survey',
        kind: 'survey' as TaskKind,
        title: 'Survey Task',
        description: 'Collect structured feedback from users',
      },
    ],
  },
};

const useTasks = () => {
  const { value, set } = useModuleContext('tasks');

  const output = (value?.output || []).map((task, i) => ({
    ...task,
    key: i,
  }));

  const add = (
    kind: 'bug' | 'video' | 'survey',
    preset?: { title?: string; description?: string }
  ) => {
    function getDefaultTitle() {
      if (kind === 'bug') return 'Search for bugs';
      if (kind === 'video') return 'Think aloud';
      return '';
    }

    set({
      output: [
        ...(value?.output || []),
        {
          kind,
          title: preset?.title || getDefaultTitle(),
          description: preset?.description || '',
        },
      ],
    });
  };

  const update = (
    k: number,
    v: Partial<{
      kind: 'bug' | 'video' | 'survey';
      title: string;
      description?: string;
    }>
  ) => {
    set({
      output: output
        .map((t) => (t.key === k ? { ...t, ...v } : t))
        .map(({ key, ...rest }) => rest),
    });
  };

  const remove = (k: number) => {
    set({
      output: output.filter((t) => t.key !== k).map(({ key, ...rest }) => rest),
    });
  };

  return { value: output, add, update, remove };
};

export const Tasks = () => {
  const { value, add, remove, update } = useTasks();
  const [addButtonRef, setAddButtonRef] = useState<HTMLButtonElement | null>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<
    'functional' | 'survey' | 'experiential'
  >('functional');

  console.log('value', value);

  const handleAddTask = (
    preset: (typeof TASK_CATEGORIES)[keyof typeof TASK_CATEGORIES]['tasks'][number]
  ) => {
    add(preset.kind, {
      title: preset.title,
      description: preset.description,
    });
    setAddButtonRef(null);
  };

  return (
    <div data-qa="tasks-module">
      <XL tag="h3" isBold style={{ marginBottom: '12px' }}>
        Tasks
      </XL>
      {value.length === 0 ? (
        <AddTaskSection>
          <Button
            ref={setAddButtonRef}
            onClick={(e) => setAddButtonRef(e.currentTarget)}
          >
            Add your first task
          </Button>
        </AddTaskSection>
      ) : (
        <>
          {value.map((task) => (
            <TaskCard key={task.key}>
              <TaskHeader>
                <TaskType isBold>
                  {task.kind === 'bug' ? 'Bug Task' : 'Video Task'}
                </TaskType>
                <Button isDanger isBasic onClick={() => remove(task.key)}>
                  Remove
                </Button>
              </TaskHeader>
              <TaskContent>
                <div>
                  <TaskLabel>Task title</TaskLabel>
                  <TaskInput
                    value={task.title}
                    onChange={(e) =>
                      update(task.key, { title: e.target.value })
                    }
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <TaskLabel>Task description</TaskLabel>
                  <TaskTextarea
                    value={task.description || ''}
                    onChange={(e) =>
                      update(task.key, { description: e.target.value })
                    }
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
              </TaskContent>
            </TaskCard>
          ))}
          <TaskActions>
            <Button onClick={(e) => setAddButtonRef(e.currentTarget)} isPrimary>
              Add another task
            </Button>
          </TaskActions>
        </>
      )}

      {addButtonRef && (
        <TooltipModal
          referenceElement={addButtonRef}
          onClose={() => setAddButtonRef(null)}
          placement="auto"
          hasArrow={false}
        >
          <TooltipModal.Title>
            <XL tag="h3" isBold>
              Add Task
            </XL>
            <SM>Provide the necessary details to describe this activity</SM>
          </TooltipModal.Title>
          <TooltipModal.Body>
            <Label>Filter by:</Label>
            <FilterButtons>
              <Button
                isBasic={selectedFilter !== 'survey'}
                onClick={() => setSelectedFilter('survey')}
              >
                Survey
              </Button>
              <Button
                isBasic={selectedFilter !== 'functional'}
                onClick={() => setSelectedFilter('functional')}
              >
                Functional
              </Button>
              <Button
                isBasic={selectedFilter !== 'experiential'}
                onClick={() => setSelectedFilter('experiential')}
              >
                Experiential
              </Button>
            </FilterButtons>

            <LG isBold>{TASK_CATEGORIES[selectedFilter].label}</LG>

            <TaskPresetList>
              {TASK_CATEGORIES[selectedFilter].tasks.map((preset) => (
                <TaskPresetItem
                  key={preset.id}
                  onClick={() => handleAddTask(preset)}
                >
                  <TaskPresetIcon />
                  <TaskPresetContent>
                    <LG isBold>{preset.title}</LG>
                    <SM>{preset.description}</SM>
                  </TaskPresetContent>
                </TaskPresetItem>
              ))}
            </TaskPresetList>
          </TooltipModal.Body>
        </TooltipModal>
      )}
    </div>
  );
};
