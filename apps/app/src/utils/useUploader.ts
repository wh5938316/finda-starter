import { useCallback, useEffect, useRef, useState } from 'react';

type UploaderProps = {
  getPresignedUrl?: (file: File) => Promise<{
    signedUrl: string;
    id: string;
  } | null>;
  url?: string;
  onChange?: (file: File[]) => boolean;
  onSuccess?: (response: Response, file: File, presignedId: string | null) => Promise<void>;
  onFailed?: (error: Error, file: File) => void;
  isMultiple?: boolean;
  immediate?: boolean;
};

function useUploader({
  getPresignedUrl,
  url,
  onChange,
  onSuccess,
  onFailed,
  isMultiple,
  immediate,
}: UploaderProps) {
  const [file, setFile] = useState<File[]>([]);
  const inputRefs = useRef<HTMLInputElement | null>(null);

  const register = (name) => ({
    name,
    type: 'file',
    ref: (el) => {
      inputRefs.current = el;
    },
    onChange: handleFileChange,
    multiple: isMultiple ?? undefined,
  });

  const handleFileChange = useCallback(
    (e) => {
      if (onChange) {
        const isValid = onChange(e.target.files);
        if (!isValid) {
          return;
        }
      }

      setFile(e.target.files);
    },
    [onChange],
  );

  const clear = () => {
    setFile([]);

    if (inputRefs.current) {
      inputRefs.current.value = '';
    }
  };

  const uploadFile = async (singleFile: File) => {
    try {
      let uploadUrl = url;
      let presignedId: string | null = null;

      if (getPresignedUrl) {
        const presigned = await getPresignedUrl(singleFile);
        if (!presigned) {
          throw new Error('Failed to get presigned url');
        }

        uploadUrl = presigned.signedUrl;
        presignedId = presigned.id;
      }

      if (!uploadUrl) {
        throw new Error('Upload URL is not available');
      }

      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: singleFile,
        // mode: 'cors',
        // headers: {
        //   'x-amz-acl': 'public-read',
        //   'Content-Type': singleFile.type,
        // },
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      if (onSuccess) {
        await onSuccess(response, singleFile, presignedId);
      }
    } catch (error: any) {
      if (onFailed) {
        onFailed(error, singleFile);
      }
    }
  };

  const handle = useCallback(async () => {
    if (file.length === 0) {
      console.error('No file selected');
      return;
    }

    try {
      for (const singleFile of file) {
        await uploadFile(singleFile);
      }
      // Clear the input after upload is complete
      clear();
    } catch (error) {
      console.error(error);
    }
  }, [file, uploadFile, clear]);

  useEffect(() => {
    if (file.length > 0 && immediate) {
      handle();
    }
  }, [immediate, handle]);

  useEffect(() => {
    return () => {
      setFile([]);
      inputRefs.current = null;
    };
  }, []);

  return {
    file,
    register,
    clear,
    handle,
  };
}

export default useUploader;
