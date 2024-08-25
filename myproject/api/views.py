from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import string

class MyAPIView(APIView):
    def get(self, request):
        # GET method returns a predefined operation_code
        operation_code = "OPERATION_123"
        return Response({"operation_code": operation_code}, status=status.HTTP_200_OK)

    def post(self, request):
    
        data = request.data.get('data', [])

        if not data:
            return Response({"is_success": False}, status=status.HTTP_400_BAD_REQUEST)

        # Extract numbers and alphabets
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]

        # Find the highest lowercase alphabet
        lowercase_alphabets = [char for char in alphabets if char.islower()]
        highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else None

        # Assuming full_name, dob, email, and roll_number are predefined or hardcoded
        full_name = "john_doe"  # Replace with actual full name
        dob = "17091999"       # Replace with actual DOB in ddmmyyyy format
        email = "john@xyz.com" # Replace with actual email
        roll_number = "ABCD123" # Replace with actual roll number

        # Construct user_id
        first_name, last_name = full_name.split('_')
        user_id = f"{first_name.lower()}_{last_name.lower()}_{dob}"

        # Prepare the response data
        response_data = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
        }
        return Response(response_data, status=status.HTTP_200_OK)