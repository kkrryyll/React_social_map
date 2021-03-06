import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    Stack,
    useColorModeValue, useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { ArrowBackIcon } from '@chakra-ui/icons';
import {useNavigate, Link as RouterLink, useLocation} from "react-router-dom"
import { categoryData } from '../../mocks/CategoryMock';
import React, { useState } from "react";
import AddButton from '../../components/Buttons/AddButton';
import {errorToast, successToast} from "../../components/Toasts/ToastUtil";
import {addCategory} from "../../socialMapApi/categoryRequests";

export default function AddCategoryModerator() {
    const navigate = useNavigate();
    const toast = useToast();
    const {state} = useLocation();
    const {beforeSite} = state || {};

    const boxColor = useColorModeValue('gray.600', 'gray.700');
    const labelColor = useColorModeValue('gray.600', 'gray.200');
    const inputColor = useColorModeValue('gray.100', 'gray.50')
    const subBoxColor = useColorModeValue('gray.600', 'gray.600');

    async function onSubmit(data) {
        const res = await addCategory(data)
        if(res?.ok){
            successToast(toast, "added", "category")
        } else {
            errorToast(toast)
        }
        handleBack();
    }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    // const handleChange = (event) => {
    //     setValue(event.target.value)
    // }

    function handleBack() {
        navigate(!beforeSite ? "/" : beforeSite);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                minH={'100vh'}
                justify={'center'}
            >
                <Stack spacing={5} mx={'auto'} maxW={'700px'} w={'90%'} py={9} px={0}>
                    <Button alignSelf={"flex-start"} position="absolute" variant={"outline"} onClick={handleBack}>
                        <ArrowBackIcon />
                    </Button>
                    <Stack align={'center'} pt={6}>
                        <Heading fontSize={'4xl'} textAlign={'center'} color={'gray.100'}>
                            Add new category
                        </Heading>
                    </Stack>

                    <InfoBadge text="1. Informations" />

                    <Box
                        rounded={'lg'}
                        bg={boxColor}
                        boxShadow={'lg'}
                        p={8}>

                        <Stack spacing={5}>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor='name' color={labelColor}>Name</FormLabel>
                                <Input id='name' type="text" color={inputColor} bgColor={subBoxColor}
                                    placeholder='type down a category'
                                    {...register("name", {
                                        required: "This is required",
                                        minLength: { value: 3, message: "Minimum length should be 4" }
                                    })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </Box>
                    <Stack spacing={10} pt={2}>
                        <AddButton
                            loadingText="Submitting"
                            size="lg"
                            width={'99%'}
                            alignSelf={'center'}
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            Add Category
                        </AddButton>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}

function InfoBadge(props) {
    return (
        <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='blue'>
                {props.text}
            </Badge>
        </Box>
    );
}
