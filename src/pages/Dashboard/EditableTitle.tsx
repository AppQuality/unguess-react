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

export const EditableTitle = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation();
  const sendGTMEvent = useSendGTMevent();
  const { addToast } = useToast();
  const [patchProject] = usePatchProjectsByPidMutation();
  const { data: project } = useGetProjectsByPidQuery({
    pid: projectId.toString(),
  });
  const [itemTitle, setItemTitle] = useState<string>('');

  const InputToggleMemo = useMemo(
    () => (
      <InputToggle className="editable-title">
        <InputToggle.Item
          preventEmpty
          textSize="xxxl"
          maxLength={64}
          value={project?.name}
          onChange={(e) => setItemTitle(e.target.value)}
          onBlur={async (e) => {
            try {
              if (
                e.currentTarget.value &&
                e.currentTarget.value !== project?.name
              ) {
                await patchProject({
                  pid: projectId?.toString() ?? '0',
                  body: { display_name: e.currentTarget.value },
                }).unwrap();
                sendGTMEvent({
                  event: 'workspaces-action',
                  category: '',
                  action: 'change_name_success',
                  content: itemTitle,
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
              setItemTitle(project?.name ?? '');
            }
          }}
          style={{ paddingLeft: 0 }}
        />
      </InputToggle>
    ),
    [project, itemTitle]
  );

  return InputToggleMemo;
};
