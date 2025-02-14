import {
  InputToggle,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetProjectsByPidQuery,
  usePatchProjectsByPidMutation,
} from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';

export const EditableDescription = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation();
  const sendGTMEvent = useSendGTMevent();
  const { addToast } = useToast();
  const [patchProject] = usePatchProjectsByPidMutation();
  const { data: project } = useGetProjectsByPidQuery({
    pid: projectId.toString(),
  });
  const [itemDescription, setItemDescription] = useState<string>();

  const InputToggleMemo = useMemo(
    () => (
      <InputToggle className="editable-title">
        <InputToggle.Item
          placeholder={t(
            '__PROJECT_PAGE_UPDATE_PROJECT_DESCRIPTION_PLACEHOLDER'
          )}
          textSize="lg"
          maxLength={64}
          value={project?.description}
          onChange={(e) => setItemDescription(e.target.value)}
          onBlur={async (e) => {
            try {
              if (e.currentTarget.value !== project?.description) {
                await patchProject({
                  pid: projectId?.toString() ?? '0',
                  body: { description: e.currentTarget.value },
                }).unwrap();
                sendGTMEvent({
                  event: 'workspaces-action',
                  category: '',
                  action: 'change_description_success',
                  content: itemDescription,
                });
              }
            } catch {
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="error"
                    message={t('__PROJECT_PAGE_UPDATE_PROJECT_NAME_ERROR')}
                    closeText={t('__TOAST_CLOSE_TEXT')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
              setItemDescription(project?.description ?? '');
            }
          }}
          style={{ paddingLeft: 0 }}
        />
      </InputToggle>
    ),
    [project, itemDescription]
  );

  return InputToggleMemo;
};
