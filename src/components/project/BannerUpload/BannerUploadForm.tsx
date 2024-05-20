/**
 * @file src/components/BannerUpload/BannerUploadForm.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Banner Upload Form component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import Loader from '../global/Loader';
import { useAppState } from '@/src/lib/providers/stateProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UploadBannerFormSchema } from '@/src/lib/types';
import { updateFile, updateFolder, updateWorkspace } from '@/src/lib/supabase/queries';

interface BannerUploadFormProps {
    dirType: 'workspace' | 'file' | 'folder';
    id: string;
}

/**
 * @brief Banner Upload Form component
 * 
 * @param { dirType, id }
 *  
 * @returns JSX.Element 
 */
const BannerUploadForm: React.FC<BannerUploadFormProps> = ({ dirType, id }) => {

    const supabase = createClientComponentClient();
    const { workspaceId, folderId, dispatch } = useAppState();

    const { register, handleSubmit, formState: { isSubmitting: isUploading, errors }, } = useForm<z.infer<typeof UploadBannerFormSchema>>({
        mode: 'onChange',
        defaultValues: {
            banner: '',
        },
    });

    const onSubmitHandler: SubmitHandler<z.infer<typeof UploadBannerFormSchema>> = async (values) => {

        const file = values.banner?.[0];

        if (!file || !id) return;

        try {
            let filePath = null;

            const uploadBanner = async () => {
                const { data, error } = await supabase.storage.from('file-banners').upload(`banner-${id}`, file, { cacheControl: '5', upsert: true });

                if (error) throw new Error();
                filePath = data.path;
            };

            if (dirType === 'file') {
                if (!workspaceId || !folderId) return;
                await uploadBanner();
                dispatch({
                    type: 'UPDATE_FILE',
                    payload: {
                        file: { bannerUrl: filePath },
                        fileId: id,
                        folderId,
                        workspaceId,
                    },
                });

                await updateFile({ bannerUrl: filePath }, id);

            } else if (dirType === 'folder') {
                if (!workspaceId || !folderId) return;
                await uploadBanner();
                dispatch({
                    type: 'UPDATE_FOLDER',
                    payload: {
                        folderId: id,
                        folder: { bannerUrl: filePath },
                        workspaceId,
                    },
                });

                await updateFolder({ bannerUrl: filePath }, id);

            } else if (dirType === 'workspace') {
                if (!workspaceId) return;
                await uploadBanner();
                dispatch({
                    type: 'UPDATE_WORKSPACE',
                    payload: {
                        workspace: { bannerUrl: filePath },
                        workspaceId,
                    },
                });
                await updateWorkspace({ bannerUrl: filePath }, id);
            }
        } catch (error) { '' }
    };
    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-2">
            <Label className="text-sm text-muted-foreground" htmlFor="bannerImage">
                Banner Image
            </Label>
            <Input id="bannerImage" type="file" accept="image/*" disabled={isUploading} {...register('banner', { required: 'Banner Image is required' })} />
            <small className="text-red-600">
                {errors.banner?.message?.toString()}
            </small>
            <Button disabled={isUploading} type="submit">
                {!isUploading ? 'Upload Banner' : <Loader />}
            </Button>
        </form>
    );
};

export default BannerUploadForm;
